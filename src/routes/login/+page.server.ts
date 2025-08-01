// // src/routes/+page.server.ts
// import { fail, redirect } from '@sveltejs/kit'
// import type { Actions, PageServerLoad } from '../$types'

// export const load: PageServerLoad = async ({ url, locals: { safeGetSession } }) => {
//   // Check if user is already logged in
//   const { session } = await safeGetSession()
  
//   // If logged in, redirect to account page
//   if (session) {
//     redirect(303, '/account')
//   }
  
//   return {
//     url: url.origin // Might be needed for redirect URLs
//   }
// }

// export const actions: Actions = {
//   // Default action (when form is submitted without ?/actionName)
//   default: async (event) => {
//     const { url, request, locals: { supabase } } = event
    
//     // Get form data
//     const formData = await request.formData()
//     const email = formData.get('email') as string
    
//     // Validate email format
//     const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test(email)
//     if (!validEmail) {
//       return fail(400, {
//         errors: { email: 'Please enter a valid email address' },
//         email, // Return email so form can repopulate
//       })
//     }
    
//     // Send magic link
//     const { error } = await supabase.auth.signInWithOtp({
//       email,
//       options: {
//         // This is where user will be redirected after clicking magic link
//         emailRedirectTo: `${url.origin}/auth/confirm`,
//       },
//     })
    
//     if (error) {
//       console.error('Auth error:', error)
//       return fail(400, {
//         success: false,
//         email,
//         message: 'There was an issue. Please contact support.',
//       })
//     }
    
//     // Success
//     return {
//       success: true,
//       message: 'Please check your email for a magic link to log into the website.',
//     }
//   },
// }