<template>
  <div
    class="content-wrapper bg-primary leading-normal flex flex-col min-h-screen"
  >
    <header class="border-t-14 border-black">
      <div class="text-center mt-6">
        <h1 class="text-4xl font-bold leading-tight">
          Abundance of Works
        </h1>
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
          <ul
            class="uppercase justify-center tracking-wide items-center font-medium w-full block flex-grow lg:flex lg:w-auto items-center mt-8 lg:mt-0"
            :class="isOpen ? 'block' : 'hidden'"
          >
            <li class="text-center px-6 mb-10 lg:mb-0 ">
              <g-link to="/">Home</g-link>
            </li>
            <li class="text-center px-6 mb-10 lg:mb-0 ">
              <g-link to="/works">Works</g-link>
            </li>
            <li class="text-center px-6 mb-10 lg:mb-0 ">
              <g-link to="/creators">Creators</g-link>
            </li>
            <li class="text-center px-6 mb-10 lg:mb-0 ">
              <g-link to="/years">Years</g-link>
            </li>
            <li class="text-center px-6 mb-10 lg:mb-0 ">
              <g-link to="/tags">Tags</g-link>
            </li>
            <li class="text-center px-6 mb-10 lg:mb-0 ">
              <SearchInput />
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <transition name="fade" appear>
      <main class="flex-grow">
        <slot />
      </main>
    </transition>
    <footer class="bg-black text-white">
      <div class="bg-white">
        <div
          class="max-w-screen-xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8"
        >
          <nav class="-mx-5 -my-2 flex flex-wrap justify-center">
            <div class="px-5 py-2">
              <a
                href="#"
                class="text-base leading-6 text-gray-500 hover:text-gray-900"
              >
                About
              </a>
            </div>
            <div class="px-5 py-2">
              <g-link
                to="/submit"
                class="text-base leading-6 text-gray-500 hover:text-gray-900"
              >
                Submit a Work
              </g-link>
            </div>
          </nav>

          <div class="mt-8">
            <p class="text-center text-base leading-6 text-gray-400">
              &copy; 2020 AD HOC Collective
            </p>
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
<style lang="postcss">
.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-enter {
  opacity: 0;
}

.nav {
  li {
    @apply text-center px-6 mb-10;
  }
}
</style>
<script>
// import DmgLogo from "../components/DmgLogo";
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

<style src="../css/main.css" />
