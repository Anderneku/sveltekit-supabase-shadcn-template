// src/hooks.server.ts
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public'
import { createServerClient } from '@supabase/ssr'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
  // Create ONE Supabase client per HTTP request
  event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      // Read all cookies from the incoming request
      getAll: () => event.cookies.getAll(),
      
      /**
       * SvelteKit's cookies API requires `path` to be explicitly set in
       * the cookie options. Setting `path` to `/` replicates previous/
       * standard behavior.
       */
      setAll: (cookiesToSet) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          // Set each cookie with path: '/' to make it available site-wide
          event.cookies.set(name, value, { ...options, path: '/' })
        })
      },
    },
  })

  /**
   * Unlike `supabase.auth.getSession()`, which returns the session _without_
   * validating the JWT, this function also calls `getUser()` to validate the
   * JWT before returning the session.
   */
  event.locals.safeGetSession = async () => {
    // First, try to get the session from local storage (cookies)
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    
    // If no session found, return nulls
    if (!session) {
      return { session: null, user: null }
    }

    // Validate the JWT by making a request to Supabase servers
    const {
      data: { user },
      error,
    } = await event.locals.supabase.auth.getUser()
    
    // If JWT validation failed, return nulls
    if (error) {
      return { session: null, user: null }
    }

    // Both session exists AND JWT is valid
    return { session, user }
  }

  // Continue processing the request
  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      // Allow these headers to pass through from server to client
      return name === 'content-range' || name === 'x-supabase-api-version'
    },
  })
}