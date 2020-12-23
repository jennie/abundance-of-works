<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="border-t-4 border-timber">
        <div class="mt-2 text-xl font-bold mb-3">
          All works by creator
        </div>
        <h1 class="text-5xl font-bold leading-tight">
          {{ $page.creator.name }}
        </h1>
      </div>

      <div class="divide-y divide-darkLinen">
        <ul v-for="work in $page.creator.works" :key="work.id">
          <li class="text-xl py-4">
            <g-link :to="work.path" class="underline">
              {{ work.title }}
            </g-link>
            <span v-if="work.year.length" class="ml-2"
              >({{ work.year[0].name }})</span
            >
          </li>
        </ul>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID) {
  creator(id: $id) {
    name
    works {
      title
      path
      year {
        name
      }
    }
  }
}

</page-query>
<style lang="postcss">
main {
  .post-link {
    @apply text-gray-800 font-normal leading-normal;
  }
  .source a:not(.btn) {
    @apply text-gray-800 font-normal leading-normal;
  }
}
</style>
