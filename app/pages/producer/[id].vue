<template>
  <div>
    <div class="container-inner mx-auto py-16">
      <div v-if="pending" class="text-center py-8">
        <p>Loading producer...</p>
      </div>
      <div v-else-if="error" class="text-center py-8 text-red-600">
        <p>Error loading producer: {{ error.message }}</p>
      </div>
      <div v-else-if="producer">
        <div class="title">
          <h1 class="text-3xl md:text-5xl font-bold leading-tight align-middle mt-2">
            {{ producer.field_3956 }}
          </h1>
        </div>

        <div v-if="producer.field_3959?.length > 0" class="works mt-2">
          <div class="label">
            {{ producer.field_3959.length > 1 ? "Works" : "Work" }}
          </div>
          <div
            v-for="work in producer.field_3959"
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
        <p>Producer not found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { fetchRow } = useBaserow()

const { data: producer, pending, error } = await useLazyAsyncData(
  `producer-${route.params.id}`,
  () => fetchRow(config.public.baserowProducersTableId, route.params.id)
)

useSeoMeta({
  title: computed(() => producer.value ? `${producer.value.field_3956} - Abundance of Works` : 'Producer - Abundance of Works'),
  description: computed(() => producer.value ? `Details for ${producer.value.field_3956}` : 'Producer details')
})
</script>

<style lang="postcss">
.label {
  @apply text-sm uppercase tracking-wide font-bold border-t-2 border-darkLinen mt-6 mb-3 pt-2;
}
</style>