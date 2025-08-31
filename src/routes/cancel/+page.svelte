<script>
  import { XCircle } from '@lucide/svelte';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { goto } from '$app/navigation';
</script>

<Card class="max-w-md mx-auto mt-20 text-center shadow-xl">
  <CardHeader>
    <XCircle class="mx-auto text-red-500 w-16 h-16" />
    <CardTitle class="mt-4 text-2xl">Payment Failed</CardTitle>
  </CardHeader>
  <CardContent>
    <p class="mb-6 text-muted-foreground">Something went wrong during your payment. Please try again.</p>
    <Button variant="destructive" onclick={() => goto('/')}>Return Home</Button>
  </CardContent>
</Card>
