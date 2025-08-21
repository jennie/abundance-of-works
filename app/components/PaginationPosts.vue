<template>
  <div class="flex justify-between text-xl items-center">
    <NuxtLink
      :to="previousPage"
      class="uppercase tracking-wide text-lg font-bold"
      :class="{
        'text-gray-400 hover:text-gray-400 cursor-not-allowed bg-none': !showPreviousPage,
        'px-4 rounded-lg py-2 bg-pixie hover:bg-darkSeaGreen': showPreviousPage,
      }"
    >
      ← Prev
    </NuxtLink>
    <div class="text-base">Page {{ currentPage }} of {{ totalPages }}</div>
    <NuxtLink
      :to="nextPage"
      class="uppercase tracking-wide text-lg font-bold"
      :class="{
        'text-gray-400 hover:text-gray-400 cursor-not-allowed bg-none': !showNextPage,
        'px-4 rounded-lg py-2 bg-pixie hover:bg-darkSeaGreen': showNextPage,
      }"
    >
      Next →
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  base: {
    type: String,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: true
  }
})

const showPreviousPage = computed(() => props.currentPage !== 1)
const showNextPage = computed(() => props.currentPage !== props.totalPages)

const previousPage = computed(() => {
  if ([0, 1].includes(props.currentPage - 1)) {
    return props.base
  }
  return `${props.base}/${props.currentPage - 1}`
})

const nextPage = computed(() => {
  if (props.totalPages > props.currentPage) {
    return `${props.base}/${props.currentPage + 1}`
  }
  return `${props.base}/${props.currentPage}`
})
</script>