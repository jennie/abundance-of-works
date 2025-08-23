<template>
  <div>
    <div class="container-inner mx-auto py-16">
      <div v-if="pending" class="text-center py-8">
        <p>Loading publisher...</p>
      </div>
      <div v-else-if="error" class="text-center py-8 text-red-600">
        <p>Error loading publisher: {{ error.message }}</p>
      </div>
      <div v-else-if="publisher">
        <div class="title">
          <h1 class="text-3xl md:text-5xl font-bold leading-tight align-middle mt-2">
            {{ publisher[`field_${config.public.baserowPublishersDisplayNameFieldId}`] }}
          </h1>
        </div>

        <div v-if="publisher.field_40?.length > 0" class="works mt-2">
          <div class="label">
            {{ publisher.field_40.length > 1 ? "Works" : "Work" }}
          </div>
          <div
            v-for="work in publisher.field_40"
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
        <p>Publisher not found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { fetchRow } = useBaserow()

const { data: publisher, pending, error } = await useLazyAsyncData(
  `publisher-${route.params.id}`,
  () => fetchRow(config.public.baserowPublishersTableId, route.params.id)
)

useSeoMeta({
  title: computed(() => publisher.value ? `${publisher.value[`field_${config.public.baserowPublishersDisplayNameFieldId}`]} - Abundance of Works` : 'Publisher - Abundance of Works'),
  description: computed(() => publisher.value ? `Details for ${publisher.value[`field_${config.public.baserowPublishersDisplayNameFieldId}`]}` : 'Publisher details')
})
</script>

<style lang="postcss">
.label {
  @apply text-sm uppercase tracking-wide font-bold border-t-2 border-darkLinen mt-6 mb-3 pt-2;
}
</style>