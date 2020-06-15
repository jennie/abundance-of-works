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
            {{ work.node.year }}
          </p>

          <span
            v-for="creator in work.node.creators"
            :key="creator.id"
            class="tag bg-gray-200 rounded-full px-2 py-1 mr-4 hover:bg-gray-400 no-underline "
          >
            {{ creator.name }}
          </span>

          <!-- <h1 class="text-4xl font-bold leading-tight">{{ $page.post.title }}</h1>
        <div class="flex my-8 text-sm">
          <g-link
            :to="tag.path"
            v-for="tag in $page.post.tags"
            :key="tag.id"
            class="tag bg-gray-200 rounded-full px-4 py-2 mr-4 hover:bg-gray-400 no-underline uppercase "
            >{{ tag.title }}</g-link
          >
        </div> -->
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
  allWork {
    edges {
      node {
        id
        path
        title
        year
        tags {
          name
        }
        creators {
          name
          type
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
export default {
  data() {
    return {
      today: this.$today,
    };
  },
  metaInfo() {
    return {
      title: "Support Black Communities",
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content: `${
            this.$page.metadata.siteUrl
          }/images/black-communities.png`,
        },
        { name: "twitter:site", content: "@DMGToronto" },
        {
          name: "twitter:title",
          content: "Support Black Communities",
        },
        {
          name: "twitter:description",
          content:
            "Funds, donation opportunities, businesses, events, and individuals non-Black people can support.",
        },
        {
          name: "og:title",
          content: "links and Opportunities for DMG Members",
        },
        {
          name: "og:description",
          content:
            "Funds, donation opportunities, businesses, events, and individuals non-Black people can support.",
        },
        {
          name: "og:image",
          content: `${
            this.$page.metadata.siteUrl
          }/images/black-communities.png`,
        },
      ],
    };
  },
};
</script>
