<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
        <h1 class="text-3xl font-bold leading-tight">
          {{ $page.creator.name }}
        </h1>
        <div class="divide-y divide-darkLinen">
          <ul v-for="work in $page.creator.works" :key="work.id">
            <li class="text-xl py-4">
              <g-link :to="work.path">
                {{ work.title }}
              </g-link>
            </li>
          </ul>
        </div>
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
