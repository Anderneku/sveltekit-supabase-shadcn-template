Supabase's docs on getting set up with sveltekit is a little confusing, especially with their deprecation of some libraries previously used by many making virtually all online tutorials redundant 😜

I have gone through their docs and managed to create a working skeletal system that has everything already setup for you to jump in and create your files from +page.server.ts to +page.js to +page.svelte and so on without having to go through the stress of setting up your hooks and whatnot.

I also added a demo login page as a bonus!

To get setup, all you need to do is make a new project repository from this template and open it in your code editor. Once you've done that, run:
```shell
npm install
```
After all installs, create a .env file in your project root and add your supabase project's ANON_KEY AND URL like so:
```ts
PUBLIC_SUPABASE_ANON_KEY="blahblahblah"
PUBLIC_SUPABASE_URL="blahblahblah"
```
That would be all!
