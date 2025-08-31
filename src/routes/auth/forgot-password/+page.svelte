<script lang="ts">
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { Button } from '$lib/components/ui/button';
  import { superForm } from 'sveltekit-superforms';
  import { page } from '$app/stores';
 	import * as Card from '$lib/components/ui/card';
  const { data } = $props();
  const form = superForm(data.form);
  const { form: formData, enhance, submitting, errors } = form;
  
  // Check if email was sent successfully
  const emailSent = $derived($page.url.searchParams.get('sent') === 'true');
</script>
<Card.Root class="mx-auto mt-[50vh] max-w-sm -translate-y-1/2 p-10">
	<Card.Header class="text-center">
		<Card.Title class="text-2xl">Forgot Password</Card.Title>
    {#if emailSent}
		<Card.Description class="text-green-400"> If an account with that email exists, we've sent you a password reset link.</Card.Description>
     {:else}
     <Card.Description>  Enter your email address and we'll send you a link to reset your password.</Card.Description>
    {/if}
	</Card.Header>
  <Card.Content>
   {#if !emailSent}
    <!-- Display general form errors -->
    {#if $errors._errors}
      <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
        <p class="text-red-600 text-sm">
          {$errors._errors.join(', ')}
        </p>
      </div>
    {/if}
    
    <form use:enhance method="POST" class="space-y-6">
      <Form.Field {form} name="email">
        <Form.Control>
          {#snippet children({ props })}
            <Form.Label class="block mb-1 text-sm font-medium text-gray-700">Email</Form.Label>
            <Input
              {...props}
              type="email"
              bind:value={$formData.email}
              class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email address"
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
        {#if $submitting} Sending... {:else} Send Reset Link {/if}
      </Button>
    </form>

    <div class="text-center">
      <a href="/auth/sign-in" class="text-blue-600 mt-10 hover:text-blue-500 text-sm">
        Back to Sign In
      </a>
    </div>
  {/if}
  </Card.Content>
</Card.Root>
