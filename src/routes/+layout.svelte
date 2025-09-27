<script lang="ts">
	import '../app.css';
	import Navbar from "$lib/components/navBar.svelte"
	let { children, data } = $props();
</script>
<Navbar data={data}/>
{@render children()}