<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div
        v-if="isLivingFire() == true"
        class="text-red-600 uppercase text-sm tracking-wide font-bold"
      >
        Living Fire
      </div>
      <div class="heading">
        <div class="subhead">
          All works by creator
        </div>
        <h1>
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
    tags {
      name
      path
    }
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
      const tags = this.$page.creator.tags;
      if (tags) {
        tags.forEach(function(tag) {
          tagList.push(tag.name);
        });
      }
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
}
</style>
