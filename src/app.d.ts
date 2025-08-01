// src/app.d.ts
import { SupabaseClient, Session, User } from '@supabase/supabase-js'

declare global {
  namespace App {
    interface Locals {
      // The Supabase client instance for this request
      supabase: SupabaseClient
      // Safe function that validates JWT before returning session
      safeGetSession(): Promise<{ session: Session | null; user: User | null }>
    }
    interface PageData {
      // Session data available to all pages
      session: Session | null
      user: User | null
    }
    // interface Error {}
    // interface Platform {}
  }
}

export {}