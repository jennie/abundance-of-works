<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <h1 class="text-5xl font-bold leading-tight  align-middle mt-2">
        Living Fire
      </h1>

      <pagination-posts
        class="py-8"
        v-if="$page.allCreator.pageInfo.totalPages > 1"
        base="/living-fire"
        :totalPages="$page.allCreator.pageInfo.totalPages"
        :currentPage="$page.allCreator.pageInfo.currentPage"
      />
      <div class="divide-y divide-darkLinen">
        <div v-for="creator in $page.allCreator.edges" :key="creator.id">
          <g-link
            :to="creator.node.path"
            class="py-4 flex items-baseline flex-wrap justify-start "
          >
            <span
              class="text-2xl underline font-display font-bold text-left mr-2"
              >{{ creator.node.name }}</span
            >
            <div class="text-base font-normal">
              <template v-for="(value, index) in creator.node.works">
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
        v-if="$page.allCreator.pageInfo.totalPages > 1"
        base="/living-fire"
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

  allCreator(filter: { nameFromTags: { contains: "Indigenous" } }, sortBy: "Created", order: DESC, perPage: 20, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        name
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
  data() {
    return {
      seo: {
        title: "Living Fire",
        description:
          "Created in collaboration with Indigenous Performing Arts Alliance, Banff Centre for the Arts and the National Arts Centre English Theatre during The Summit: Indigenous Theatre.",
        image: `https://abundanceofworks.ca/images/living-fire.png`,
      },
    };
  },
  metaInfo() {
    return {
      title: this.seo.title,
      meta: [
        {
          key: "title",
          name: "title",
          content: this.seo.title,
        },
        {
          key: "description",
          name: "description",
          content: this.seo.description,
        },
        {
          key: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          key: "twitter:image",
          name: "twitter:image",
          content: this.seo.image,
        },
        { key: "twitter:site", name: "twitter:site", content: "@jennie" },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: this.seo.title,
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: this.seo.description,
        },
        {
          key: "og:title",
          property: "og:title",
          content: this.seo.title,
        },
        {
          key: "og:description",
          property: "og:description",
          content: this.seo.description,
        },
        {
          key: "og:image",
          property: "og:image",
          content: this.seo.image,
        },
      ],
    };
  },
};
</script>
