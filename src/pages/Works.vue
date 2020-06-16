<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="divide-y divide-gray-400">
        <div v-for="work in $page.allWork.edges" :key="work.id">
          <g-link
            :to="work.node.path"
            class="py-4 flex items-baseline flex-wrap justify-start"
          >
            <span class="text-2xl text-left mr-2">{{ work.node.title }}</span>

            <div class="text-base font-normal">
              <template v-for="(value, index) in work.node.creators">
                <template v-if="index > 0"
                  >,
                </template>
                <span :key="index">{{ value.name }}</span>
              </template>
            </div>
          </g-link>
        </div>

        <pagination-posts
          class="pt-8"
          v-if="$page.allWork.pageInfo.totalPages > 1"
          base="/works"
          :totalPages="$page.allWork.pageInfo.totalPages"
          :currentPage="$page.allWork.pageInfo.currentPage"
        />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query Works ($page: Int) {

  allWork(sortBy: "title", order: DESC, perPage: 10, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        path
        title
        year {
          name
        }
        tags {
          name
        }
        creators {
          name
          type
        }
        publishers {
          name
        }
        producers {
          name
        }        
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
<script>
import PaginationPosts from "~/components/PaginationPosts";

export default {
  components: {
    PaginationPosts,
  },

  metaInfo() {
    return {
      title: "Abundance of Works",
      meta: [
        { key: "title", name: "description", content: "" },
        { key: "description", name: "description", content: "" },
        { key: "twitter:card", name: "twitter:card", content: "" },
        { key: "twitter:image", name: "twitter:image", content: "" },
        { key: "twitter:site", name: "twitter:site", content: "" },
        { key: "twitter:title", name: "twitter:title", content: "" },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: "",
        },
        { key: "og:title", name: "og:title", content: "" },
        { key: "og:description", name: "og:description", content: "" },
        { key: "og:image", name: "og:image", content: "" },
      ],
    };
  },
};
</script>
