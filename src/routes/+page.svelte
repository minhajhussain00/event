<script>
  // No JS needed yet, pure layout
</script>

<div class="font-sans text-gray-900">

<!-- Hero Section with YouTube Background -->
<section class="relative min-h-screen flex items-center justify-center overflow-hidden text-center">
  <!-- YouTube Background -->
  <div class="absolute inset-0 w-full h-full pointer-events-none">
    <iframe
      class="w-full h-full scale-150"
      src="https://www.youtube.com/embed/u_qFlTu7HTw?autoplay=1&mute=1&loop=1&playlist=u_qFlTu7HTw&controls=0&showinfo=0&modestbranding=1"
      frameborder="0"
      allow="autoplay; fullscreen"
    ></iframe>
  </div>

  <!-- Dark overlay for readability -->
  <div class="absolute inset-0 bg-black/60"></div>

  <!-- Content -->
  <div class="relative z-10 text-white px-6">
    <h1 class="text-5xl md:text-7xl font-bold mb-6">Plan. Invite. Celebrate.</h1>
    <p class="text-lg md:text-2xl mb-10 max-w-2xl mx-auto">
      Create beautiful events, manage RSVPs, and sell tickets—all in one place.
    </p>
    <div class="flex justify-center gap-4">
      <a href="/create-event" class="bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl shadow hover:bg-gray-100 text-lg">
        Create an Event
      </a>
      <a href="/events" class="bg-transparent border border-white px-8 py-4 rounded-xl hover:bg-white/10 text-lg">
        Explore Events
      </a>
    </div>
  </div>
</section>



  <!-- How It Works -->
  <section class="py-20 px-6 max-w-6xl mx-auto text-center">
    <h2 class="text-3xl font-bold mb-12">How It Works</h2>
    <div class="grid md:grid-cols-3 gap-10">
      <div>
        <div class="text-5xl mb-4">🎉</div>
        <h3 class="font-semibold text-xl mb-2">Create</h3>
        <p>Set up your event in minutes—public or private.</p>
      </div>
      <div>
        <div class="text-5xl mb-4">📩</div>
        <h3 class="font-semibold text-xl mb-2">Invite</h3>
        <p>Send invites or sell tickets with ease.</p>
      </div>
      <div>
        <div class="text-5xl mb-4">✅</div>
        <h3 class="font-semibold text-xl mb-2">Manage</h3>
        <p>Track RSVPs and guest lists in real time.</p>
      </div>
    </div>
  </section>

  <!-- Features -->
  <section class="bg-gray-50 py-20 px-6">
    <div class="max-w-6xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-12">Why Choose Us?</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="p-6 bg-white rounded-2xl shadow">
          <h3 class="font-semibold text-xl mb-2">Easy Setup</h3>
          <p>Design your event page with a few clicks.</p>
        </div>
        <div class="p-6 bg-white rounded-2xl shadow">
          <h3 class="font-semibold text-xl mb-2">Seamless Payments</h3>
          <p>Sell tickets securely with built-in checkout.</p>
        </div>
        <div class="p-6 bg-white rounded-2xl shadow">
          <h3 class="font-semibold text-xl mb-2">Smart RSVP</h3>
          <p>See who’s attending and manage guest lists easily.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="py-20 px-6 text-center bg-gradient-to-r from-purple-600 to-pink-500 text-white">
    <h2 class="text-3xl font-bold mb-4">Ready to host your event?</h2>
    <p class="mb-8">Start for free and bring your ideas to life today.</p>
    <button class="bg-white text-purple-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-gray-100">
      Get Started
    </button>
  </section>

  <!-- Footer -->
  <footer class="py-10 px-6 text-center text-sm text-gray-500 bg-gray-100">
    <p>© 2025 Eventify. All rights reserved.</p>
    <div class="flex justify-center gap-6 mt-4">
      <a href="#" class="hover:text-gray-700">About</a>
      <a href="#" class="hover:text-gray-700">Contact</a>
      <a href="#" class="hover:text-gray-700">Privacy</a>
      <a href="#" class="hover:text-gray-700">Terms</a>
    </div>
  </footer>
</div>

