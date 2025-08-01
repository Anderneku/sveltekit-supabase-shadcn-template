<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import "../app.css";

	// SvelteKit 5 runes syntax
	let { data, children } = $props();
	let { supabase, session } = $derived(data);

	onMount(() => {
		// Listen for auth state changes
		const { data: authData } = supabase.auth.onAuthStateChange((event, newSession) => {
			// Only invalidate if the session actually changed
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth'); // Triggers reload of depends('supabase:auth')
			}
		});

		// Cleanup subscription when component unmounts
		return () => authData.subscription.unsubscribe();
	});
</script>

<svelte:head>
	<title>Supabase App</title>
</svelte:head>

{@render children()}
