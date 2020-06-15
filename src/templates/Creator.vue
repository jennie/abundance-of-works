<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
        <h1 class="text-3xl font-bold leading-tight">
          {{ $page.creator.name }}
        </h1>

        <div v-for="work in $page.creator.works" :key="work.id">
          <g-link :to="work.path">
            {{ work.title }}
          </g-link>
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
