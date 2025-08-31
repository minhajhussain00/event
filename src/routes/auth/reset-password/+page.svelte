<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { superForm } from 'sveltekit-superforms';

  const { data } = $props();
  const form = superForm(data.form);
  const { form: formData, enhance, submitting } = form;
  
  // Set the token from the page data
  $formData.token = data.token;
</script>

<div class="max-w-md mx-auto mt-10 bg-white p-10 rounded-lg shadow space-y-6 border border-gray-200">
  <div class="text-center">
    <h2 class="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
    <p class="text-gray-600 text-sm mb-6">
      Enter your new password below.
    </p>
  </div>

  <form use:enhance method="POST" class="space-y-6">
    <!-- Hidden token field -->
    <input type="hidden" name="token" bind:value={$formData.token} />
    
    <Form.Field {form} name="password">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label class="block mb-1 text-sm font-medium text-gray-700">New Password</Form.Label>
          <Input
            {...props}
            type="password"
            bind:value={$formData.password}
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
          />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors class="text-red-500 text-xs mt-1" />
    </Form.Field>

    <Form.Field {form} name="confirmPassword">
      <Form.Control>
        {#snippet children({ props })}
          <Form.Label class="block mb-1 text-sm font-medium text-gray-700">Confirm Password</Form.Label>
          <Input
            {...props}
            type="password"
            bind:value={$formData.confirmPassword}
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
          />
        {/snippet}
      </Form.Control>
      <Form.FieldErrors class="text-red-500 text-xs mt-1" />
    </Form.Field>

    <Button
      type="submit"
      disabled={$submitting}
      class="w-full py-2 px-4 text-white font-semibold rounded"
    >
      {#if $submitting} Resetting... {:else} Reset Password {/if}
    </Button>
  </form>

  <div class="text-center">
    <a href="/auth/sign-in" class="text-blue-600 hover:text-blue-500 text-sm">
      Back to Sign In
    </a>
  </div>
</div>