<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
        <div
          v-for="creator in $page.allCreator.edges"
          :key="creator.id"
          class="my-2 py-2 border-b"
        >
          <h2 class="text-2xl">
            <g-link :to="creator.node.path">{{ creator.node.name }}</g-link>
          </h2>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query {
  metadata {
    siteName
    siteUrl
  }
  allCreator {
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
export default {
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
