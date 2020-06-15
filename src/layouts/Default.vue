<template>
  <div
    class="content-wrapper bg-background-primary leading-normal flex flex-col min-h-screen"
  >
    <header class="border-t-14 border-red-700">
      <div class="text-center mt-6">
        <h1 class="text-4xl font-bold leading-tight">
          Abundance of Works
        </h1>
      </div>
      <nav
        class="container mx-auto flex flex-wrap items-center py-8 justify-center"
      >
        <div class="block te text-center justify-center lg:hidden">
          <button
            @click="toggle"
            class="flex items-center px-3 py-2 border rounded border-gray-500 hover:text-gray-600 hover:border-gray-600"
          >
            Menu
          </button>
        </div>
      </nav>
    </header>
    <transition name="fade" appear>
      <main class="flex-grow">
        <slot />
      </main>
    </transition>
    <footer class="bg-red-700 text-white">
      <div
        class="container mx-auto flex flex-col lg:flex-row items-center justify-between py-8"
      ></div>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
    siteUrl
  }
}
</static-query>
<style>
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}
</style>
<script>
// import DmgLogo from "../components/DmgLogo";

export default {
  components: {
    // DmgLogo,
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

<style src="../css/main.css" />
