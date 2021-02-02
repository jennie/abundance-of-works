<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-5xl font-bold leading-tight  align-middle mt-2">
        All Producers
      </h1>

      <pagination-posts
        class="py-8"
        v-if="$page.allProducer.pageInfo.totalPages > 1"
        base="/producers"
        :totalPages="$page.allProducer.pageInfo.totalPages"
        :currentPage="$page.allProducer.pageInfo.currentPage"
      />
      <div class="divide-y divide-darkLinen">
        <div v-for="producer in $page.allProducer.edges" :key="producer.id">
          <g-link
            :to="producer.node.path"
            class="py-4 flex items-baseline flex-wrap justify-start "
          >
            <span
              class="text-2xl underline font-display font-bold text-left mr-2"
              >{{ producer.node.name }}</span
            >
            <div class="text-base font-normal">
              <template v-for="(value, index) in producer.node.works">
                <template v-if="index > 0"
                  >,
                </template>
                <span :key="index">{{ value.title }}</span>
              </template>
            </div>
          </g-link>
        </div>
      </div>

      <pagination-posts
        class="pt-8"
        v-if="$page.allProducer.pageInfo.totalPages > 1"
        base="/producers"
        :totalPages="$page.allProducer.pageInfo.totalPages"
        :currentPage="$page.allProducer.pageInfo.currentPage"
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
  allProducer(sortBy: "Created", order: DESC, perPage: 20, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        name
        created
        path
        works(limit: 3) {
          title
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
