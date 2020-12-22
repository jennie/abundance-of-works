<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-5xl font-bold leading-tight  align-middle mt-2">
        All Creators
      </h1>

      <pagination-posts
        class="py-8"
        v-if="$page.allCreator.pageInfo.totalPages > 1"
        base="/creators"
        :totalPages="$page.allCreator.pageInfo.totalPages"
        :currentPage="$page.allCreator.pageInfo.currentPage"
      />
      <div class="divide-y divide-darkLinen">
        <div
          v-for="creator in $page.allCreator.edges"
          :key="creator.id"
          class="py-4"
        >
          <h2 class="text-2xl">
            <g-link :to="creator.node.path" class="underline"
              ><span class="text-2xl font-display  font-bold text-left mr-2">{{
                creator.node.name
              }}</span></g-link
            >
          </h2>
        </div>
      </div>

      <pagination-posts
        class="pt-8"
        v-if="$page.allCreator.pageInfo.totalPages > 1"
        base="/creators"
        :totalPages="$page.allCreator.pageInfo.totalPages"
        :currentPage="$page.allCreator.pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  metadata {
    siteName
    siteUrl
  }
  allCreator(sortBy: "name", order: DESC, perPage: 20, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        name
        path
        works {
          title
          path
          year {
            name
          }
        }
      }
    }
  }
}
</page-query>

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
