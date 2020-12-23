<template>
  <nav class="bg-timber">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="hidden lg:flex-1 lg:flex items-center px-2 lg:px-0 w-full">
          <div class="flex space-x-4 menu justify-between w-full">
            <div>
              <g-link to="/">Home</g-link>
              <g-link to="/works">Works</g-link>
              <g-link to="/creators">Creators</g-link>
              <g-link to="/years">Years</g-link>
              <g-link to="/tags">Tags</g-link>
            </div>
            <div>
              <g-link to="/about">About Abundance</g-link>
            </div>
          </div>
        </div>
        <div
          class="flex-1 lg:flex-initial w-full lg:w-auto flex justify-center px-2 lg:ml-6 lg:justify-end"
        >
          <div class="max-w-lg w-full lg:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <SearchInput />
            </div>
          </div>
        </div>
        <div class="flex lg:hidden">
          <!-- Mobile menu button -->
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-linen hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              @click="toggle"
              class="h-6 w-6"
              :class="isOpen ? 'hidden' : 'block'"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>

            <svg
              @click="toggle"
              class="h-6 w-6"
              :class="isOpen ? 'block' : 'hidden'"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="lg:hidden" :class="isOpen ? 'block' : 'hidden'">
      <div class="px-2 pt-2 pb-3 space-y-1 mobile-menu">
        <g-link to="/">Home</g-link>
        <g-link to="/works">Works</g-link>
        <g-link to="/creators">Creators</g-link>
        <g-link to="/years">Years</g-link>
        <g-link to="/tags">Tags</g-link>
        <g-link to="/about">About Abundance</g-link>
      </div>
    </div>
  </nav>
</template>

<style lang="postcss">
.menu {
  a {
    @apply text-linen px-3 py-2 rounded-md font-medium;
    :hover {
      @apply bg-gray-700 text-linen;
    }
    &.active--exact {
      @apply bg-gray-900 text-linen;
    }
  }
}
.mobile-menu {
  a {
    @apply text-linen block px-3 py-2 rounded-md text-base font-medium;
    :hover {
      @apply bg-gray-700 text-linen;
    }
    &.active--exact {
      @apply bg-gray-900 text-linen;
    }
  }
}
</style>

<script>
import SearchInput from "../components/SearchInput";

export default {
  components: {
    SearchInput,
  },

  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
