<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
        <div class="border-t-4 border-timber">
          <div class="mt-2 text-xl font-bold mb-3">
            All works by tag
          </div>
          <h1 class="text-5xl font-bold leading-tight">
            {{ $page.tag.name }}
          </h1>
        </div>
        <pagination-posts
          class="py-8"
          v-if="$page.tag.belongsTo.pageInfo.totalPages > 1"
          :base="$page.tag.path"
          :totalPages="$page.tag.belongsTo.pageInfo.totalPages"
          :currentPage="$page.tag.belongsTo.pageInfo.currentPage"
        />
        <div class="divide-y divide-darkLinen">
          <div v-for="work in $page.tag.belongsTo.edges" :key="work.node.id">
            <g-link
              :to="work.node.path"
              class="py-4 flex items-baseline flex-wrap justify-start "
            >
              <span
                class="text-2xl font-display underline font-bold text-left mr-2"
                >{{ work.node.title }}</span
              >

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
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($id: ID, $page: Int) {
  tag(id: $id) {
      belongsTo(perPage: 10, page: $page) @paginate {
        pageInfo {
          totalPages
          currentPage
        }
        edges {
          node {
            ... on Work {
              id
              title
              path
              creators {
                name
                type
              }
            }
          }
        }
      }
    name
    path
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
