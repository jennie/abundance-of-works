<template>
  <div>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-5xl font-bold leading-tight align-middle mt-2">
        All Publishers
      </h1>
      
      <PaginationPosts
        v-if="data && totalPages > 1"
        class="py-8"
        base="/publishers"
        :totalPages="totalPages"
        :currentPage="currentPage"
      />
      
      <div v-if="pending" class="text-center py-8">
        <p>Loading publishers...</p>
      </div>
      <div v-else-if="error" class="text-center py-8 text-red-600">
        <p>Error loading publishers: {{ error.message }}</p>
      </div>
      <div v-else>
        <div class="divide-y divide-darkLinen">
          <div v-for="publisher in data?.results || []" :key="publisher.id">
            <NuxtLink
              :to="`/publisher/${publisher.id}`"
              class="py-4 flex items-baseline flex-wrap justify-start"
            >
              <span class="text-2xl underline font-display font-bold text-left mr-2">
                {{ publisher.field_3963 }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <PaginationPosts
        v-if="data && totalPages > 1"
        class="pt-8"
        base="/publishers"
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
  `publishers-page-${currentPage.value}`,
  () => fetchTable(config.public.baserowPublishersTableId, { 
    page: currentPage.value,
    size: perPage 
  })
)

const totalPages = computed(() => {
  if (!data.value?.count) return 1
  return Math.ceil(data.value.count / perPage)
})

useSeoMeta({
  title: 'Publishers - Abundance of Works',
  description: 'Browse all publishers in the database'
})
</script>