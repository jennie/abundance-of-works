<template>
  <div>
    <div class="container-inner mx-auto py-16">
      <div v-if="pending" class="text-center py-8">
        <p>Loading tag...</p>
      </div>
      <div v-else-if="error" class="text-center py-8 text-red-600">
        <p>Error loading tag: {{ error.message }}</p>
      </div>
      <div v-else-if="tag">
        <div class="title">
          <h1 class="text-3xl md:text-5xl font-bold leading-tight align-middle mt-2">
            {{ tag.field_3973 }}
          </h1>
          <span class="font-bold text-xl align-middle" v-if="tag.field_3975?.length > 0">
            {{ tag.field_3975[0].value }}
          </span>
        </div>

        <div v-if="tag.field_3976?.length > 0" class="creators mt-2">
          <div class="label">
            {{ tag.field_3976.length > 1 ? "Creators" : "Creator" }}
          </div>
          <div
            v-for="creator in tag.field_3976"
            :key="creator.id"
            class="py-1 mr-4 text-2xl"
          >
            <NuxtLink :to="`/creator/${creator.id}`" class="underline">
              {{ creator.value }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-8">
        <p>Tag not found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { fetchRow } = useBaserow()

const { data: tag, pending, error } = await useLazyAsyncData(
  `tag-${route.params.id}`,
  () => fetchRow(config.public.baserowTagsTableId, route.params.id)
)

useSeoMeta({
  title: computed(() => tag.value ? `${tag.value.field_3973} - Abundance of Works` : 'Tag - Abundance of Works'),
  description: computed(() => tag.value ? `Creators tagged with ${tag.value.field_3973}` : 'Tag details')
})
</script>

<style lang="postcss">
.label {
  @apply text-sm uppercase tracking-wide font-bold border-t-2 border-darkLinen mt-6 mb-3 pt-2;
}
</style>