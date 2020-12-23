<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-5xl font-bold leading-tight  align-middle mt-2 mb-6">
        All Years
      </h1>
      <div class="flex flex-wrap md:grid md:grid-cols-6 gap-10">
        <div v-for="year in $page.allYear.edges" :key="year.id" class="py-4">
          <h2 class="text-2xl p-2 md:p-0">
            <g-link :to="year.node.path" class="font-bold underline">{{
              year.node.name
            }}</g-link>
          </h2>
        </div>
      </div>

      <pagination-posts
        class="pt-8"
        v-if="$page.allYear.pageInfo.totalPages > 1"
        base="/years"
        :totalPages="$page.allYear.pageInfo.totalPages"
        :currentPage="$page.allYear.pageInfo.currentPage"
      />
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int)  {
  metadata {
    siteName
    siteUrl
  }
  allYear(sortBy: "Name", order: DESC, perPage: 50, page: $page) @paginate {
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

export default {
  components: {
    PaginationPosts,
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
