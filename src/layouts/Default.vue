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

    <main class="flex-grow">
      <slot />
    </main>
    <footer class="bg-red-700 text-white">
      <div
        class="container mx-auto flex flex-col lg:flex-row items-center justify-between py-8"
      >
        <div class="mb-8 lg:mb-0">
          <div class="flex justify-center align-middle">
            <a
              class="mr-6"
              rel="license"
              href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
              ><img
                alt="Creative Commons Licence"
                style="border-width:0"
                src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"/></a
            ><br />
            <div>
              This work is licensed by Dames Making Games under a
              <a
                class="text-white hover:text-white"
                rel="license"
                href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
                >Creative Commons Attribution-NonCommercial-ShareAlike 4.0
                International License</a
              >
            </div>
            .
          </div>
        </div>
      </div>
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

<script>
import DmgLogo from "../components/DmgLogo";

export default {
  components: {
    DmgLogo,
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
<style lang="postcss">
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-red {
  @apply bg-red-500 text-white;
}
.btn-red:hover {
  @apply bg-red-700 text-white;
}
</style>
<style src="../css/main.css" />
