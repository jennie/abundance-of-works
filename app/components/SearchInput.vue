<template>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg
        class="h-5 w-5 text-linen"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true">
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd" />
      </svg>
    </div>
    <input
      id="search"
      v-model="searchQuery"
      @keyup.enter="performSearch"
      name="search"
      class="block w-full pl-10 pr-3 py-2 border border-darkLinen rounded-md leading-5 bg-transparent text-linen placeholder-darkLinen focus:placeholder-transparent focus:outline-none focus:ring-white focus:text-white sm:text-sm"
      placeholder="Search"
      type="search" />
  </div>
</template>

<script setup>
const searchQuery = ref("");
const router = useRouter();

const performSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: "/search",
      query: { q: searchQuery.value },
    });
  }
};
</script>
