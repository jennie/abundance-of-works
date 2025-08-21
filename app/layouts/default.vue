<template>
  <div
    class="content-wrapper bg-primary leading-normal flex flex-col min-h-screen"
  >
    <Menu />
    <header class="border-t-14 border-mongoose">
      <div class="hidden">
        <h1>
          Abundance of Works
        </h1>
      </div>
    </header>
    <transition name="fade" appear>
      <main class="flex-grow">
        <slot />
      </main>
    </transition>
    <footer>
      <div
        class="max-w-screen-xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8"
      >
        <nav class="-mx-5 -my-2 flex flex-wrap justify-center">
          <div class="px-5 py-2">
            <NuxtLink
              to="/about"
              class="text-base leading-6 hover:underline hover:text-cuttySark underline"
            >
              About
            </NuxtLink>
          </div>
          <div class="px-5 py-2">
            <NuxtLink
              to="/submit"
              class="text-base leading-6 hover:underline hover:text-cuttySark underline"
            >
              Submit a Work
            </NuxtLink>
          </div>
          <div class="px-5 py-2">
            Contact us at
            <a
              href="mailto:adhocassembly@gmail.com"
              target="_blank"
              class="text-base leading-6 hover:underline hover:text-cuttySark underline"
              >adhocassembly@gmail.com
            </a>
          </div>
        </nav>

        <div class="mt-8">
          <p class="text-center text-base leading-6 text-mongoose">
            &copy; 2025 Ad Hoc Assembly
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Menu from '~/components/Menu.vue'
</script>

<style lang="postcss">
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}
</style>