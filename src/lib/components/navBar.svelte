<script lang="ts">
  import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
  import { Root, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "./ui/navigation-menu";
  import { Button } from "./ui/button";
  import { Menu } from "@lucide/svelte";

  const {data} = $props()
  console.log("session:"+data)
  const user = data?.session?.user || null
  const navLinks = [
    { name: "Events", href: "/events" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "My Event", href: "/Myevent" },
  ];
</script>

<nav class="border-b bg-background">
  <div class="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
    <!-- Logo -->
    <a href="/" class="font-bold text-lg">Eventify</a>

    <!-- Desktop Menu -->
    <div class="hidden md:flex items-center gap-6">
      <Root>
        <NavigationMenuList>
          {#each navLinks as link}
            <NavigationMenuItem>
              <NavigationMenuLink href={link.href} class="px-3 py-2">
                {link.name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          {/each}
        </NavigationMenuList>
      </Root>

      {#if user}
        <Button >
          <a href="/dashboard">Dashboard</a>
        </Button>
        <Button variant="ghost">Logout</Button>
      {:else}
        <Button variant="outline" >
          <a href="/auth/sign-in">Login</a>
        </Button>
        <Button >
          <a href="/auth/sign-up">Sign Up</a>
        </Button>
      {/if}
    </div>

    <!-- Mobile Menu -->
    <div class="md:hidden">
      <Sheet>
        <SheetTrigger >
          <Button variant="ghost" size="icon">
            <Menu class="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" class="w-64">
          <div class="py-4 font-bold text-lg">Eventify</div>
          <div class="flex flex-col gap-3">
            {#each navLinks as link}
              <a href={link.href} class="text-foreground hover:text-primary transition-colors">
                {link.name}
              </a>
            {/each}
            <hr class="my-3" />
            {#if user}
              <a href="/dashboard">Dashboard</a>
              <button class="text-left text-red-500">Logout</button>
            {:else}
              <a href="/login">Login</a>
              <a href="/signup" class="font-bold">Sign Up</a>
            {/if}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  </div>
</nav>
