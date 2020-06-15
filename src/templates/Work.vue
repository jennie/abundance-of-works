<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
                <h1 class="text-3xl font-bold leading-tight">
{{$page.work.title}}
</h1>
        <!-- <div
          v-for="work in $page.allWork.edges"
          :key="work.id"
          class="my-2 py-2 border-b"
        >
          <h2 class="text-2xl">
            <a :href="work.node.URL" target="_blank">{{ work.node.title }}</a>
          </h2>
          <p class="font-bold">
            {{ work.node.year }}
          </p>

          <span
            v-for="creator in work.node.creators"
            :key="creator.id"
            class="tag bg-gray-200 rounded-full px-2 py-1 mr-4 hover:bg-gray-400 no-underline "
          >
            {{ creator.name }}
          </span> -->

          <!-- <h1 class="text-4xl font-bold leading-tight">{{ $page.post.title }}</h1>
        <div class="flex my-8 text-sm">
          <g-link
            :to="tag.path"
            v-for="tag in $page.post.tags"
            :key="tag.id"
            class="tag bg-gray-200 rounded-full px-4 py-2 mr-4 hover:bg-gray-400 no-underline uppercase "
            >{{ tag.title }}</g-link
          >
        </div> -->
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID) {
  work(id: $id) {
    title
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
