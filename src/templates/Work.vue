<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
        <div class="title flex justify-between">
          <h1 class="text-3xl font-bold leading-tight">
            {{ $page.work.title }}
          </h1>

          <span class="font-bold text-xl" v-if="$page.work.year[0]">
            <g-link :to="$page.work.year[0].path">{{
              $page.work.year[0].name
            }}</g-link>
          </span>
        </div>
        <div v-if="$page.work.creators" class="creators mt-2">
          {{ $page.work.creators.length > 1 ? "Creators" : "Creator" }}
          <span
            v-for="creator in $page.work.creators"
            :key="creator.id"
            class="px-2 py-1 mr-4 text-2xl"
          >
            <g-link :to="creator.path">
              {{ creator.name }}
            </g-link>
          </span>
        </div>

        <div v-if="$page.work.tags" class="publishers my-6">
          <span
            v-for="tag in $page.work.tags"
            :key="tag.id"
            class="tag bg-gray-200 rounded-full px-2 py-1 mr-4 hover:bg-blue-400 no-underline text-black no-underline"
          >
            <g-link :to="tag.path" class=" text-black no-underline">
              {{ tag.name }}
            </g-link>
          </span>
        </div>

        <div v-if="$page.work.producers.length > 0" class="producers mt-2">
          {{ $page.work.producers.length > 1 ? "Producers" : "Producer" }}

          <span
            v-for="producer in $page.work.producers"
            :key="producer.id"
            class="tag bg-red-200 rounded-full px-2 py-1 mr-4 hover:bg-red-400 no-underline "
          >
            {{ producer.name }}
          </span>
        </div>
        <div v-if="$page.work.publishers.length > 0" class="publishers mt-2">
          {{ $page.work.publishers.length > 1 ? "Publishers" : "Publisher" }}

          <span
            v-for="publisher in $page.work.publishers"
            :key="publisher.id"
            class="tag bg-blue-200 rounded-full px-2 py-1 mr-4 hover:bg-blue-400 no-underline "
          >
            {{ publisher.name }}
          </span>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID) {
  work(id: $id) {
    id
    path
    title
    year {
      name
      path
    }
    tags {
      name
      path
    }
    creators {
      name
      type
      path
    }
    publishers {
      name
      path
    }
    producers {
      name
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
