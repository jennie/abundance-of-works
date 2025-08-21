<template>
  <div>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-5xl font-bold leading-tight align-middle mt-2">
        All Works
      </h1>
      
      <PaginationPosts
        v-if="data && totalPages > 1"
        class="py-8"
        base="/works"
        :totalPages="totalPages"
        :currentPage="currentPage"
      />
      
      <div v-if="pending" class="text-center py-8">
        <p>Loading works...</p>
      </div>
      <div v-else-if="error" class="text-center py-8 text-red-600">
        <p>Error loading works: {{ error.message }}</p>
      </div>
      <div v-else>
        <div class="divide-y divide-darkLinen">
          <div v-for="work in data?.results || []" :key="work.id">
            <NuxtLink
              :to="`/work/${work.id}`"
              class="py-4 flex items-baseline flex-wrap justify-start"
            >
              <span class="text-2xl font-display underline font-bold text-left mr-2">
                {{ work.field_3927 }}
              </span>
              <div class="text-base font-normal">
                <template v-for="(creator, index) in work.field_3929" :key="creator.id">
                  <template v-if="index > 0">, </template>
                  <span>{{ creator.value }}</span>
                </template>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      
      <PaginationPosts
        v-if="data && totalPages > 1"
        class="pt-8"
        base="/works"
        :totalPages="totalPages"
        :currentPage="currentPage"
      />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const { fetchTable } = useBaserow()

const currentPage = computed(() => parseInt(route.params.page) || 1)
const perPage = 20

const { data, pending, error } = await useLazyAsyncData(
  `works-page-${currentPage.value}`,
  () => fetchTable(449, { 
    page: currentPage.value,
    size: perPage 
  })
)

const totalPages = computed(() => {
  if (!data.value?.count) return 1
  return Math.ceil(data.value.count / perPage)
})

useSeoMeta({
  title: 'Works - Abundance of Works',
  description: 'Browse all theatrical works in the database'
})
</script>