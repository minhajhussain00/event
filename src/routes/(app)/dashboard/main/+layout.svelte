<script lang="ts">
    import SideBar from '$lib/components/sideBar.svelte';
	let {children} = $props();
</script>

<div class="flex flex-row gap-4 py-1 px-2">
    <SideBar/>
    {@render children()}

</div>