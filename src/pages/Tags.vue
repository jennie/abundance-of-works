<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <MultiSelectSearch />
      <!-- <div class="divide-y divide-gray-400">
        <div v-for="tag in $page.allTag.edges" :key="tag.id" class="py-4">
          <h2 class="text-2xl">
            <g-link :to="tag.node.path">{{ tag.node.name }}</g-link>
          </h2>
        </div>
      </div>
      <pagination-posts
        class="pt-8"
        v-if="$page.allTag.pageInfo.totalPages > 1"
        base="/tags"
        :totalPages="$page.allTag.pageInfo.totalPages"
        :currentPage="$page.allTag.pageInfo.currentPage"
      /> -->
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int) {
  metadata {
    siteName
    siteUrl
  }
  allTag(sortBy: "name", order: DESC, perPage: 10, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        name
        path
      }
    }
  }
}


</page-query>

<script>
import PaginationPosts from "~/components/PaginationPosts";
import MultiSelectSearch from "~/components/MultiSelectSearch";

export default {
  components: {
    PaginationPosts,
    MultiSelectSearch,
  },
  metaInfo() {
    return {
      title: "Abundance of Works.",
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
