<template>
  <div>
    <div class="container-inner mx-auto py-16">
      <div v-if="pending" class="text-center py-8">
        <p>Loading work...</p>
      </div>
      <div v-else-if="error" class="text-center py-8 text-red-600">
        <p>Error loading work: {{ error.message }}</p>
      </div>
      <div v-else-if="work">
        <div class="title">
          <h1 class="text-3xl md:text-5xl font-bold leading-tight align-middle mt-2">
            {{ work[`field_${config.public.baserowWorksDisplayTitleFieldId}`] }}
            <span
              v-if="work[`field_${config.public.baserowWorksDisplayAdaptedFromFieldId}`]"
              class="block text-xl text-gray-600 font-normal"
            >
              adapted from {{ work[`field_${config.public.baserowWorksDisplayAdaptedFromFieldId}`] }}
            </span>
          </h1>

          <span class="font-bold text-xl align-middle" v-if="work[`field_${config.public.baserowWorksDisplayImportedYearFieldId}`]">
            {{ work[`field_${config.public.baserowWorksDisplayImportedYearFieldId}`] }}
          </span>
        </div>

        <div v-if="work[`field_${config.public.baserowWorksDisplayCreatorsFieldId}`]?.length > 0" class="creators mt-2">
          <div class="label">
            {{ work[`field_${config.public.baserowWorksDisplayCreatorsFieldId}`].length > 1 ? "Creators" : "Creator" }}
          </div>
          <div
            v-for="creator in work[`field_${config.public.baserowWorksDisplayCreatorsFieldId}`]"
            :key="creator.id"
            class="py-1 mr-4 text-2xl"
          >
            <NuxtLink :to="`/creator/${creator.id}`" class="underline">
              {{ creator.value }}
            </NuxtLink>
          </div>
          <span v-if="work[`field_${config.public.baserowWorksDisplayWithEnsembleFieldId}`] === true" class="text-gray-700">
            with ensemble
          </span>
        </div>

        <div v-if="work[`field_${config.public.baserowWorksDisplayProducersFieldId}`]?.length > 0" class="producers mt-2">
          <div class="label">
            {{ work[`field_${config.public.baserowWorksDisplayProducersFieldId}`].length > 1 ? "Producers" : "Producer" }}
          </div>
          <span
            v-for="producer in work[`field_${config.public.baserowWorksDisplayProducersFieldId}`]"
            :key="producer.id"
            class="tag bg-pixie rounded-full px-2 py-1 mr-4 hover:bg-darkSeaGreen no-underline"
          >
            <NuxtLink :to="`/producer/${producer.id}`">{{ producer.value }}</NuxtLink>
          </span>
        </div>

        <div v-if="work[`field_${config.public.baserowWorksDisplayPublishersFieldId}`]?.length > 0" class="publishers mt-2">
          <div class="label">
            {{ work[`field_${config.public.baserowWorksDisplayPublishersFieldId}`].length > 1 ? "Publishers" : "Publisher" }}
          </div>
          <span
            v-for="publisher in work[`field_${config.public.baserowWorksDisplayPublishersFieldId}`]"
            :key="publisher.id"
            class="tag bg-darkLinen rounded-full px-2 py-1 mr-4 hover:bg-mongoose no-underline"
          >
            <NuxtLink :to="`/publisher/${publisher.id}`">{{ publisher.value }}</NuxtLink>
          </span>
        </div>
      </div>
      <div v-else class="text-center py-8">
        <p>Work not found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { fetchRow } = useBaserow()

const { data: work, pending, error } = await useLazyAsyncData(
  `work-${route.params.id}`,
  () => fetchRow(config.public.baserowWorksTableId, route.params.id)
)

useSeoMeta({
  title: computed(() => work.value ? `${work.value.field_3927} - Abundance of Works` : 'Work - Abundance of Works'),
  description: computed(() => work.value ? `Details for ${work.value.field_3927}` : 'Work details')
})
</script>

<style lang="postcss">
.label {
  @apply text-sm uppercase tracking-wide font-bold border-t-2 border-darkLinen mt-6 mb-3 pt-2;
}

.tag a {
  @apply no-underline;
}
</style>