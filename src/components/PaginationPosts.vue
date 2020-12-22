<template>
  <div class="flex justify-between text-xl items-center">
    <g-link
      :to="previousPage"
      class="uppercase tracking-wide text-lg font-bold"
      :class="{
        'text-gray-400 hover:text-gray-400 cursor-not-allowed  bg-none': !showPreviousPage,
        'px-4 rounded-lg py-2 bg-pixie hover:bg-darkSeaGreen': showPreviousPage,
      }"
      >&larr; Prev</g-link
    >
    <div class="text-base ">Page {{ currentPage }} of {{ totalPages }}</div>
    <g-link
      :to="nextPage"
      class="uppercase tracking-wide text-lg font-bold"
      :class="{
        'text-gray-400 hover:text-gray-400 cursor-not-allowed bg-none': !showNextPage,
        'px-4 rounded-lg py-2 bg-pixie hover:bg-darkSeaGreen': showNextPage,
      }"
      >Next &rarr;</g-link
    >
  </div>
</template>

<script>
export default {
  props: ["base", "totalPages", "currentPage"],
  computed: {
    showPreviousPage() {
      return this.currentPage !== 1;
    },
    previousPage() {
      return [0, 1].includes(this.currentPage - 1)
        ? this.base
        : `${this.base}/${this.currentPage - 1}`;
    },
    showNextPage() {
      return this.currentPage !== this.totalPages;
    },
    nextPage(currentPage, totalPages) {
      return this.totalPages > this.currentPage
        ? `${this.base}/${this.currentPage + 1}`
        : `${this.base}/${this.currentPage}`;
    },
  },
};
</script>
