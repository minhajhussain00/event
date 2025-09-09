<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import * as Card from "$lib/components/ui/card";
  import SuperDebug from "sveltekit-superforms/SuperDebug.svelte";
  import { Input } from "$lib/components/ui/input";
  import { formSchema } from "./schema";
  import { superForm } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";
  import type { PageData } from "./types";

  let { data }: { data: PageData } = $props();

  let form = $derived(
    superForm(data.form , {
      validators: zodClient(formSchema),
      dataType: "json",
    }),
  );
  
  let formData = $derived(form.form);
  let errors = $derived(form.errors);
  let message = $derived(form.message);
  let submitting = $derived(form.submitting);
  let enhance = $derived(form.enhance);
</script>

<div class="flex min-h-screen">

  <div class="flex w-full max-w-xl flex-col justify-center px-16 py-12">
    <Card.Root
      class="w-[420px] rounded-xl p-8 bg-white mx-auto shadow-none border-none"
    >
      <div class="text-center mb-10">
        <h1 class="text-2xl font-semibold">Welcome</h1>
        <p class="text-gray-500 text-sm">Enter your information to continue</p>
      </div>

      <Card.Content class="flex flex-col gap-6">
        {#if $message}
          <div
            class="rounded-md text-center text-green-600 text-sm font-medium"
          >
            {$message}
          </div>
        {/if}

        <form use:enhance class="flex flex-col gap-5">
          <!-- Attending -->
          <Form.Field {form} name="isAttending">
            <Form.Control>
              {#snippet children({ props })}
                <label class="flex items-center gap-2">
                  <Input
                    {...props}
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300"
                    bind:value={$formData.isAttending}
                  />
                  <span class="text-gray-700 text-lg font-bold"
                    >Would you attend?</span
                  >
                </label>
              {/snippet}
            </Form.Control>
            <Form.FieldErrors class="text-xs text-red-500 mt-1" />
          </Form.Field>

          <Form.Field {form} name="guestCount">
            <Form.Control>
              {#snippet children({ props })}
                <Form.Label>How many guests will you bring?</Form.Label>
                <Input
                  {...props}
                  type="number"
                  bind:value={$formData.guestCount}
                />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors />
          </Form.Field>

         
          <Form.Field {form} name="message">
            <Form.Control>
              {#snippet children({ props })}
                <div class="flex flex-col gap-1">
                  <Form.Label class=" font-bold text-lg text-gray-700"
                    >Message for the host</Form.Label
                  >
                  <Input
                    {...props}
                    bind:value={$formData.message}
                    placeholder="Enter your message"
                    class="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              {/snippet}
            </Form.Control>
            <Form.FieldErrors class="text-xs text-red-500 mt-1" />
          </Form.Field>

          <Form.Button
            disabled={$submitting}
            class="w-full rounded-lg bg-blue-600 text-white font-medium py-2 hover:bg-blue-700 transition disabled:opacity-50"
          >
            {$submitting ? "Submitting..." : "Submit"}
          </Form.Button>

          {#if $errors?._errors}
            <div class="mt-2 text-center text-sm text-red-600">
              {$errors?._errors}
            </div>
          {/if}
        </form>
      </Card.Content>
    </Card.Root>
  </div>
  <SuperDebug data={form} />

  <div class="hidden lg:flex flex-1 items-center justify-center bg-gray-50">
    <div
      class="hidden lg:flex flex-1 items-center justify-center bg-gray-50 p-12"
    >
      <div class="max-w-2xl w-full bg-white rounded-xl border p-8">
      
        <h1 class="text-3xl font-bold mb-2">{data?.event.name}</h1>

    
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-gray-600 mb-4"
        >
          <p class="text-sm">
            📅 <span class="font-medium">
              {new Date(data?.event.date).toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
          <p class="text-sm">
            📍 <span class="font-medium">{data?.event.location}</span>
          </p>
        </div>

        <p class="text-gray-700 leading-relaxed mb-6">
          {data?.event.description}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div class="p-3 rounded-lg bg-gray-50">
            <span class="block text-gray-500">Type</span>
            <span class="font-medium capitalize">{data?.event.type}</span>
          </div>
          <div class="p-3 rounded-lg bg-gray-50">
            <span class="block text-gray-500">Venue</span>
            <span class="font-medium">{data?.event.venue}</span>
          </div>
          <div class="p-3 rounded-lg bg-gray-50">
            <span class="block text-gray-500">Visibility</span>
            <span class="font-medium"
              >{data?.event.isPublic ? "Public" : "Private"}</span
            >
          </div>
          <div class="p-3 rounded-lg bg-gray-50">
            <span class="block text-gray-500">Created</span>
            <span class="font-medium">
              {new Date(data?.event.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
