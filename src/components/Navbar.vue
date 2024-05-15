<!-- Navbar.vue -->
<template>
  <nav class="bg-gray-800">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <!-- Logo -->
        <div>
          <span class="text-white font-semibold text-lg">API Visualizer</span>
        </div>

        <!-- Responsive menu button -->
        <div class="lg:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-white focus:outline-none"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Desktop menu -->
        <div
          class="hidden lg:flex lg:items-center lg:w-auto"
          :class="{ block: isMobileMenuOpen, hidden: !isMobileMenuOpen }"
        >
          <ul class="lg:flex lg:items-center">
            <!-- Add more navigation links here -->
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMobileMenuOpen: false,
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
  },
};
</script>
