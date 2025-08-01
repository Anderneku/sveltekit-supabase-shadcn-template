// src/routes/+layout.server.ts
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals: { safeGetSession }, cookies }) => {
  // Use the SAFE session getter that validates JWTs
  const { session, user } = await safeGetSession()
  
  return {
    session,  // Validated session or null
    user,     // Validated user or null
    cookies: cookies.getAll(), // All cookies for the client-side supabase client
  }
}