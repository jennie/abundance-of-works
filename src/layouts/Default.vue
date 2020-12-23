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
            <g-link
              to="/about"
              class="text-base leading-6 hover:underline hover:text-cuttySark underline"
            >
              About
            </g-link>
          </div>
          <div class="px-5 py-2">
            <g-link
              to="/submit"
              class="text-base leading-6 hover:underline hover:text-cuttySark underline"
            >
              Submit a Work
            </g-link>
          </div>
        </nav>

        <div class="mt-8">
          <p class="text-center text-base leading-6 text-mongoose">
            &copy; 2020 AD HOC Collective
          </p>
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
<style lang="postcss">
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}
</style>
<script>
import SearchInput from "../components/SearchInput";
import Menu from "../components/Menu";

export default {
  components: {
    SearchInput,
    Menu,
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
