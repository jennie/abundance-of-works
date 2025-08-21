<template>
  <nav class="bg-timber">
    <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <div
        class="relative flex items-center justify-between h-16 md:h-24 lg:h-16 md:pt-2 lg:pt-0">
        <div class="hidden md:flex md:flex-1 items-start px-2 md:px-0 w-full">
          <div class="menu w-full">
            <div
              class="hidden lg:flex lg:flex-wrap lg:space-x-4 lg:justify-between lg:items-center lg:w-full">
              <div class="flex flex-wrap space-x-4">
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/works">Works</NuxtLink>
                <NuxtLink to="/creators">Creators</NuxtLink>
                <NuxtLink to="/producers">Producers</NuxtLink>
                <NuxtLink to="/publishers">Publishers</NuxtLink>
                <NuxtLink to="/years">Years</NuxtLink>
                <NuxtLink to="/tags">Tags</NuxtLink>
                <NuxtLink to="/living-fire" class="living-fire"
                  >Living Fire</NuxtLink
                >
              </div>
              <div>
                <NuxtLink to="/about">About Abundance</NuxtLink>
              </div>
            </div>
            <!-- Tablet layout: 2 rows stacking -->
            <div class="md:flex lg:hidden md:flex-col md:space-y-1 md:w-full">
              <div class="flex flex-wrap space-x-2">
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/works">Works</NuxtLink>
                <NuxtLink to="/creators">Creators</NuxtLink>
                <NuxtLink to="/producers">Producers</NuxtLink>
              </div>
              <div class="flex flex-wrap space-x-2">
                <NuxtLink to="/publishers">Publishers</NuxtLink>
                <NuxtLink to="/years">Years</NuxtLink>
                <NuxtLink to="/tags">Tags</NuxtLink>
                <NuxtLink to="/living-fire" class="living-fire"
                  >Living Fire</NuxtLink
                >
                <NuxtLink to="/about">About</NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div
          class="flex-1 md:flex-initial w-full md:w-auto flex justify-center items-start md:items-center px-2 md:ml-6 md:justify-end md:pt-2 lg:pt-0">
          <div class="max-w-lg w-full md:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <SearchInput />
            </div>
          </div>
        </div>
        <div class="flex xs:hidden md:pt-2 lg:pt-0">
          <!-- Mobile menu button -->
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-mongoose hover:text-linen hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg
              @click="toggle"
              class="h-6 w-6"
              :class="isOpen ? 'hidden' : 'block'"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>

            <svg
              @click="toggle"
              class="h-6 w-6"
              :class="isOpen ? 'block' : 'hidden'"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="md:hidden" :class="isOpen ? 'block' : 'hidden'">
      <div class="px-2 pt-2 pb-3 space-y-1 mobile-menu">
        <NuxtLink @click="closeMenu" to="/">Home</NuxtLink>
        <NuxtLink @click="closeMenu" to="/works">Works</NuxtLink>
        <NuxtLink @click="closeMenu" to="/creators">Creators</NuxtLink>
        <NuxtLink @click="closeMenu" to="/producers">Producers</NuxtLink>
        <NuxtLink @click="closeMenu" to="/publishers">Publishers</NuxtLink>
        <NuxtLink @click="closeMenu" to="/years">Years</NuxtLink>
        <NuxtLink @click="closeMenu" to="/tags">Tags</NuxtLink>
        <NuxtLink @click="closeMenu" to="/living-fire" class="living-fire"
          >Living Fire</NuxtLink
        >
        <NuxtLink @click="closeMenu" to="/about">About Abundance</NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import SearchInput from "./SearchInput.vue";

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};
</script>

<style lang="postcss">
.menu {
  a {
    @apply text-linen px-3 py-2 rounded-md font-medium;
    :hover {
      @apply bg-cuttySark text-linen;
    }
    &.living-fire {
      @apply text-linen uppercase tracking-wide;
    }
    &.router-link-active {
      @apply bg-timber text-darkLinen;
      &.living-fire {
        @apply bg-mongoose text-linen;
      }
    }
  }
}
.mobile-menu {
  a {
    @apply text-linen block px-3 py-2 rounded-md text-base font-medium;
    :hover {
      @apply bg-cuttySark text-linen;
    }
    &.living-fire {
      @apply py-2 px-3 text-red-600 uppercase text-sm tracking-wide font-bold mt-2 inline-block;
    }
    &.router-link-active {
      @apply bg-gray-900 text-linen;
      &.living-fire {
        @apply bg-red-700;
      }
    }
  }
}
</style>
