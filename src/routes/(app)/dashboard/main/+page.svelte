<script lang="ts">
    import * as Cards from "$lib/components/ui/card";
    const { data } = $props();
    let events = data.events;
    console.log(events.length);
</script>

{#if events.length == 0}
    <div class="w-full border-2 shadow-accent rounded-lg flex flex-col items-center justify-center space-y-4">
        <h2 class="text-4xl font-semibold">No Events Found</h2>
        <p class="text-gray-600">You have not created any events yet. Start by creating a new event!</p>

        <a
            href="/dashboard/events/create"
            class="inline-flex  items-center px-5 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-[0.9rem] text-white uppercase tracking-widest hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-25 transition ease-in-out duration-150"
        >
            Create Event
        </a>
    </div>
{:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#each events as event}
            <Cards.Card>
                <Cards.CardHeader>
                    <Cards.CardTitle>{event.name}</Cards.CardTitle>
                    <Cards.CardDescription>{event.date}</Cards.CardDescription>
                </Cards.CardHeader>
                <Cards.CardContent>
                    <p>{event.description}</p>
                </Cards.CardContent>
                <Cards.CardFooter>
                    <a
                        href={`/dashboard/events/${event.id}`}
                        class="text-blue-600 hover:underline">View Details</a
                    >
                </Cards.CardFooter>
            </Cards.Card>
        {/each}
    </div>
{/if}
