<template>
  <div>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-5xl font-bold leading-tight align-middle mt-2">
        All Creators
      </h1>
      
      <PaginationPosts
        v-if="data && totalPages > 1"
        class="py-8"
        base="/creators"
        :totalPages="totalPages"
        :currentPage="currentPage"
      />
      
      <div v-if="pending" class="text-center py-8">
        <p>Loading creators...</p>
      </div>
      <div v-else-if="error" class="text-center py-8 text-red-600">
        <p>Error loading creators: {{ error.message }}</p>
      </div>
      <div v-else>
        <div class="divide-y divide-darkLinen">
          <div v-for="creator in data?.results || []" :key="creator.id">
            <NuxtLink
              :to="`/creator/${creator.id}`"
              class="py-4 flex items-baseline flex-wrap justify-start"
            >
              <span class="text-2xl underline font-display font-bold text-left mr-2">
                {{ creator[`field_${config.public.baserowCreatorsDisplayNameFieldId}`] }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <PaginationPosts
        v-if="data && totalPages > 1"
        class="pt-8"
        base="/creators"
        :totalPages="totalPages"
        :currentPage="currentPage"
      />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const { fetchTable } = useBaserow()

const currentPage = computed(() => parseInt(route.params.page) || 1)
const perPage = 20

const { data, pending, error } = await useLazyAsyncData(
  `creators-page-${currentPage.value}`,
  () => fetchTable(config.public.baserowCreatorsTableId, { 
    page: currentPage.value,
    size: perPage 
  })
)

const totalPages = computed(() => {
  if (!data.value?.count) return 1
  return Math.ceil(data.value.count / perPage)
})

useSeoMeta({
  title: 'Creators - Abundance of Works',
  description: 'Browse all creators in the database'
})
</script>