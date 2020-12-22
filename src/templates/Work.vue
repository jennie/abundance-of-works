<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
        <div
          v-if="isLivingFire() == true"
          class="text-red-600 uppercase text-sm tracking-wide font-bold"
        >
          Living Fire
        </div>
        <div class="title flex justify-between items-center">
          <h1 class="text-5xl font-bold leading-tight  align-middle mt-2">
            {{ $page.work.title }}
            <span
              v-if="$page.work.adaptedFrom"
              class="block text-xl text-gray-600 font-normal"
              >adapted from {{ $page.work.adaptedFrom }}</span
            >
          </h1>

          <span
            class="font-bold text-xl align-middle"
            v-if="$page.work.year[0]"
          >
            <g-link :to="$page.work.year[0].path">{{
              $page.work.year[0].name
            }}</g-link>
          </span>
        </div>
        <div v-if="$page.work.creators.length > 0" class="creators mt-2">
          <div class="label">
            {{ $page.work.creators.length > 1 ? "Creators" : "Creator" }}
          </div>
          <span
            v-for="creator in $page.work.creators"
            :key="creator.id"
            class="py-1 mr-4 text-2xl"
          >
            <g-link :to="creator.path">
              {{ creator.name }}
            </g-link>
          </span>
          <span v-if="$page.work.withEnsemble == true" class="text-gray-700"
            >with ensemble</span
          >
        </div>

        <div v-if="$page.work.tags" class="publishers my-6">
          <div class="label">
            Tags
          </div>
          <span
            v-for="tag in $page.work.tags"
            :key="tag.id"
            class="tag bg-timber rounded-full px-2 py-1 mr-4 hover:bg-gray-900 no-underline text-linen"
          >
            <g-link :to="tag.path" class=" text-linen no-underline">
              {{ tag.name }}
            </g-link>
          </span>
        </div>
      </div>

      <div v-if="$page.work.producers.length > 0" class="producers mt-2">
        <div class="label">
          {{ $page.work.producers.length > 1 ? "Producers" : "Producer" }}
        </div>
        <span
          v-for="producer in $page.work.producers"
          :key="producer.id"
          class="tag bg-pixie rounded-full px-2 py-1 mr-4 hover:bg-darkSeaGreen no-underline "
        >
          <g-link :to="producer.path">{{ producer.name }}</g-link>
        </span>
      </div>
      <div v-if="$page.work.publishers.length > 0" class="publishers mt-2">
        <div class="label">
          {{ $page.work.publishers.length > 1 ? "Publishers" : "Publisher" }}
        </div>
        <span
          v-for="publisher in $page.work.publishers"
          :key="publisher.id"
          class="tag bg-blue-200 rounded-full px-2 py-1 mr-4 hover:bg-blue-400 no-underline "
          ><g-link :to="publisher.path"> {{ publisher.name }}</g-link>
        </span>
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
    adaptedFrom
    withEnsemble
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
<script>
// TODO: make livingfire check a global component
export default {
  data() {
    return {
      tagList: [],
    };
  },
  computed: {
    listTags() {
      let tagList = [];
      const tags = this.$page.work.tags;
      tags.forEach(function(tag) {
        tagList.push(tag.name);
      });
      return tagList;
    },
  },
  methods: {
    isLivingFire() {
      if (this.listTags.includes("Indigenous")) {
        return true;
      }
    },
  },
};
</script>
<style lang="postcss">
main {
  .post-link {
    @apply text-gray-800 font-normal leading-normal;
  }
  .source a:not(.btn) {
    @apply text-gray-800 font-normal leading-normal;
  }
  .label {
    @apply text-sm uppercase tracking-wide font-bold border-t-2 mt-6 mb-3 pt-2;
  }
}
</style>
