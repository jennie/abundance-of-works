<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
        <div
          v-for="work in $page.allWork.edges"
          :key="work.id"
          class="my-2 py-2 border-b"
        >
          <h2 class="text-2xl">
            <g-link :to="work.node.path">{{ work.node.title }}</g-link>
          </h2>
          <p class="font-bold">
            {{ work.node.year.name }}
          </p>
          <div v-if="work.node.creators" class="creators mt-2">
            <span
              v-for="creator in work.node.creators"
              :key="creator.id"
              class="tag bg-gray-200 rounded-full px-2 py-1 mr-4 hover:bg-gray-400 no-underline "
            >
              {{ creator.name }}
            </span>
          </div>
        </div>

        <pagination-posts
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
