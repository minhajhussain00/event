<script>
  import { CheckCircle } from '@lucide/svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { goto } from '$app/navigation';
</script>

<Card class="max-w-md mx-auto mt-20 text-center shadow-xl">
  <CardHeader>
    <CheckCircle class="mx-auto text-green-500 w-16 h-16" />
    <CardTitle class="mt-4 text-2xl">Payment Successful!</CardTitle>
  </CardHeader>
  <CardContent>
    <p class="mb-6 text-muted-foreground">Thank you for your purchase. You’ll receive an email confirmation shortly.</p>
    <Button onclick={() => goto('/')}>Go Home</Button>
  </CardContent>
</Card>
