<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { CalendarDays, MapPin, Clock, CloudUpload, UserPlus } from "@lucide/svelte";

  const links = [
    { name: "My Events", icon: CalendarDays, href: "/events" },
    { name: "Upcoming", icon: MapPin, href: "/upcoming" },
    { name: "Create Event", icon: CloudUpload, href: "/create" },
  ];
</script>

<div class="w-50 bg-gray-200 h-169 rounded-md">
  <div class="p-4 flex flex-col gap-4">
    {#each links as link}
      <a href={link.href} class="flex items-center gap-2 hover:bg-gray-300 p-2 rounded">
        <svelte:component this={link.icon} class="w-5 h-5" />
        <span>{link.name}</span>
      </a>
    {/each}
  </div>
</div>