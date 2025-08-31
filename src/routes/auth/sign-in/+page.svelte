<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import Password from '$lib/components/password.svelte';
	import { formSchema, type FormSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let form = $derived(
		superForm(data.form, {
			validators: zodClient(formSchema),
			dataType: 'json'
		})
	);

	let formData = $derived(form.form);
	let errors = $derived(form.errors);
	let submitting = $derived(form.submitting);
	let enhance = $derived(form.enhance);

	const passwordReset = $derived($page.url.searchParams.get('reset') === 'true');
</script>

<Card.Root class="mx-auto mt-[50vh] max-w-sm -translate-y-1/2">
	<Card.Header class="text-center">
		<Card.Title class="text-2xl">Sign In</Card.Title>
		<Card.Description>Enter your email below to sign into your account</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		{#if passwordReset}
			<div class="text-center">
				<p class="text-green-600 text-sm mb-4">
					Your password has been reset successfully. Please sign in with your new password.
				</p>
			</div>
		{/if}

		<form method="POST" use:enhance class="space-y-4">
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input
							{...props}
							bind:value={$formData.email}
							type="email"
							placeholder="Enter your email"
							class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="text-red-500 text-xs mt-1" />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Password
							bind:value={$formData.password}
							{...props}
							class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="text-red-500 text-xs mt-1" />
			</Form.Field>

			<div class="flex justify-between items-center text-sm">
				<a href="/auth/sign-up" class="text-blue-700">Create account</a>
				<a href="/auth/forgot-password" class="text-blue-700">Forgot password?</a>
			</div>

			<Button
				type="submit"
				disabled={$submitting}
				class="w-full py-2 px-4 text-white font-semibold rounded bg-blue-600 hover:bg-blue-700"
			>
				{#if $submitting} Signing in... {:else} Sign In {/if}
			</Button>

			{#if $errors?._errors}
				<div class="mt-3 rounded-md text-red-700 text-sm">
					{$errors._errors}
				</div>
			{/if}
		</form>
	</Card.Content>
</Card.Root>
