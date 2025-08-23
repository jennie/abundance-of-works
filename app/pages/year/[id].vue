<template>
  <div>
    <div class="container-inner mx-auto py-16">
      <div v-if="pending" class="text-center py-8">
        <p>Loading year...</p>
      </div>
      <div v-else-if="error" class="text-center py-8 text-red-600">
        <p>Error loading year: {{ error.message }}</p>
      </div>
      <div v-else-if="year">
        <div class="title">
          <h1 class="text-3xl md:text-5xl font-bold leading-tight align-middle mt-2">
            {{ year[`field_${config.public.baserowYearsDisplayNameFieldId}`] }}
          </h1>
        </div>

        <div v-if="year.field_45?.length > 0" class="works mt-2">
          <div class="label">
            {{ year.field_45.length > 1 ? "Works" : "Work" }}
          </div>
          <div
            v-for="work in year.field_45"
            :key="work.id"
            class="py-1 mr-4 text-2xl"
          >
            <NuxtLink :to="`/work/${work.id}`" class="underline">
              {{ work.value }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8">
        <p>Year not found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { fetchRow } = useBaserow()

const { data: year, pending, error } = await useLazyAsyncData(
  `year-${route.params.id}`,
  () => fetchRow(config.public.baserowYearsTableId, route.params.id)
)

useSeoMeta({
  title: computed(() => year.value ? `${year.value[`field_${config.public.baserowYearsDisplayNameFieldId}`]} - Abundance of Works` : 'Year - Abundance of Works'),
  description: computed(() => year.value ? `Works from ${year.value[`field_${config.public.baserowYearsDisplayNameFieldId}`]}` : 'Year details')
})
</script>

<style lang="postcss">
.label {
  @apply text-sm uppercase tracking-wide font-bold border-t-2 border-darkLinen mt-6 mb-3 pt-2;
}
</style>