<template>
  <div>
    <div class="container-inner mx-auto py-16">
      <div v-if="pending" class="text-center py-8">
        <p>Loading creator...</p>
      </div>
      <div v-else-if="error" class="text-center py-8 text-red-600">
        <p>Error loading creator: {{ error.message }}</p>
      </div>
      <div v-else-if="creator">
        <div class="title">
          <h1 class="text-3xl md:text-5xl font-bold leading-tight align-middle mt-2">
            {{ creator[`field_${config.public.baserowCreatorsDisplayNameFieldId}`] }}
          </h1>
          <span class="font-bold text-xl align-middle" v-if="creator.field_21?.value">
            {{ creator.field_21.value }}
          </span>
        </div>

        <div v-if="creator.field_23?.length > 0" class="works mt-2">
          <div class="label">
            {{ creator.field_23.length > 1 ? "Works" : "Work" }}
          </div>
          <div
            v-for="work in creator.field_23"
            :key="work.id"
            class="py-1 mr-4 text-2xl"
          >
            <NuxtLink :to="`/work/${work.id}`" class="underline">
              {{ work.value }}
            </NuxtLink>
          </div>
        </div>

        <div v-if="creator.field_26?.length > 0" class="tags mt-2">
          <div class="label">
            Tags
          </div>
          <span
            v-for="tag in creator.field_26"
            :key="tag.id"
            class="tag bg-timber rounded-full px-2 py-1 mr-4 hover:bg-gray-900 no-underline text-linen"
          >
            <NuxtLink :to="`/tag/${tag.id}`" class="text-linen no-underline">
              {{ tag.value }}
            </NuxtLink>
          </span>
        </div>
      </div>
      <div v-else class="text-center py-8">
        <p>Creator not found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { fetchRow } = useBaserow()

const { data: creator, pending, error } = await useLazyAsyncData(
  `creator-${route.params.id}`,
  () => fetchRow(config.public.baserowCreatorsTableId, route.params.id)
)

useSeoMeta({
  title: computed(() => creator.value ? `${creator.value[`field_${config.public.baserowCreatorsDisplayNameFieldId}`]} - Abundance of Works` : 'Creator - Abundance of Works'),
  description: computed(() => creator.value ? `Details for ${creator.value[`field_${config.public.baserowCreatorsDisplayNameFieldId}`]}` : 'Creator details')
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