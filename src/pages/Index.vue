<template>
  <Layout>
    <div class="mx-auto pb-16">
      <main class="lg:relative">
        <div
          class="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left"
        >
          <div class="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <h1
              class="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl"
            >
              <div
                class="text-4xl lg:text-6xl font-display lg:leading-snug leading-normal"
              >
                <span class="block xl:inline">
                  <span class="font-bold"
                    >Abundance honours past, present, and future creators.</span
                  >
                  <span class="font-medium block">We are here.</span>
                </span>
              </div>
            </h1>
            <p
              class="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:max-w-3xl"
            >
              The Abundance of Works is an aggregation of performance works by
              equity-seeking performing arts creators in Canada.
            </p>
            <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div class="rounded-md shadow">
                <g-link
                  to="/works"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-linen bg-cuttySark hover:bg-timber md:py-4 md:text-lg md:px-10"
                >
                  Explore Works
                </g-link>
              </div>
              <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <g-link
                  to="/submit"
                  class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md  bg-pixie hover:bg-darkSeaGreen md:py-4 md:text-lg md:px-10"
                >
                  Submit a Work
                </g-link>
              </div>
            </div>
          </div>
        </div>
        <div
          class="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full"
        >
          <g-image
            class="absolute inset-0 w-full h-full object-cover"
            src="~/images/leaf.jpg"
            alt=""
          />
        </div>
      </main>

      <section class="bg-pixie text-timber">
        <div class="inner flex flex-wrap w-full">
          <div class="flex-1">
            <span class="count text-4xl md:text-8xl  block text-center">{{
              $static.allWork.totalCount
            }}</span>
            <span class="text-2xl block text-center">Works</span>
          </div>
          <div class="flex-1">
            <span class="count text-4xl md:text-8xl  block text-center">{{
              $static.allCreator.totalCount
            }}</span>
            <span class="text-2xl block text-center">Creators</span>
          </div>
        </div>
        <div class="inner">
          <div class="heading">
            <p class="mt-2 text-xl font-body font-bold">
              The Abundance of Works is an attempt to document every existing
              Canadian play by equity-seeking playwrights.
            </p>
            <div class="mt-5 text-2xl prose leading-normal">
              <p>
                In most cases, we have tried to identify the premiering theatre.
                Please note that while some works have received public
                presentations, they may not have been fully produced thus far.
              </p>
              <p>
                This list incorporates the works in the Living Fire (formerly
                the Indigenous Body of Work), which was created in collaboration
                with Indigenous Performing Arts Alliance, Banff Centre for the
                Arts and the National Arts Centre English Theatre during
                <a
                  href="https://nac-cna.ca/en/cycle/indigenous/summit"
                  target="_blank"
                  >The Summit: Indigenous Theatre</a
                >.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- <div class="">
        <div class="grid grid-cols-3 g gap-20">
          <PieChart :chartdata="GenderData" :options="options"></PieChart>
          <PieChart :chartdata="RaceData" :options="options"></PieChart>
          <PieChart :chartdata="AbilityData" :options="options"></PieChart>
        </div>
      </div> -->
    </div>
  </Layout>
</template>

<style lang="postcss">
main {
  .post-link {
    @apply text-gray-800 font-normal leading-normal;
  }
  .source a:not(.btn) {
    @apply text-gray-800 font-normal leading-normal;
  }
}
section {
  @apply relative px-4;
  @screen sm {
    @apply px-6;
  }
  @screen lg {
    @apply px-8;
  }
  .inner {
    @apply mx-auto max-w-7xl w-full pb-20;
    &:first-child {
      @apply pt-16;
    }
    @screen lg {
      @apply pb-40 text-left;
      &:first-child {
        @apply pt-40;
      }
    }
  }
  h4 {
    @apply font-display font-bold text-xl text-cuttySark;
  }
}
</style>

<static-query>
query tags {
  allWork {
    totalCount
  }
  allCreator {
    totalCount
  }
  genderTags: allTagTypes(filter: {name: {eq: "Gender"}}) {
    edges {
      node {
        ...tagQuery
      }
    }
  }
  raceTags: allTagTypes(filter: {name: {eq: "Race"}}) {
    edges {
      node {
        ...tagQuery
      }
    }
  }
  abilityTags: allTagTypes(filter: {name: {eq: "Ability"}}) {
    edges {
      node {
        ...tagQuery
      }
    }
  }
}

fragment tagQuery on TagTypes {
  name
  tags {
    count
    name
  }
}

</static-query>

<script>
import PieChart from "~/components/PieChart.vue";
export default {
  components: {
    PieChart,
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      seo: {
        title: "Living Fire",
        description:
          "Abundance honours past, present, and future creators. We are here. The Abundance of Works is an aggregation of performance works by equity-seeking performing arts creators in Canada.",
        image: `https://abundanceofworks.ca/images/abundance.png`,
      },
    };
  },

  computed: {
    GenderData: function() {
      let labels = [];
      let data_tagType = [];

      const tagTypes = this.$static.genderTags.edges.map((edge) => edge.node);
      tagTypes.forEach((tagType) => {
        const tags = tagType.tags.map((obj) => {
          labels.push(obj.name);
          data_tagType.push(obj.count);
        });
      });
      return {
        labels: labels,
        datasets: [{ data: data_tagType }],
      };
    },
    RaceData: function() {
      let labels = [];
      let data_tagType = [];

      const tagTypes = this.$static.raceTags.edges.map((edge) => edge.node);
      tagTypes.forEach((tagType) => {
        const tags = tagType.tags.map((obj) => {
          labels.push(obj.name);
          data_tagType.push(obj.count);
        });
      });
      return {
        labels: labels,
        datasets: [{ data: data_tagType }],
      };
    },
    AbilityData: function() {
      let labels = [];
      let data_tagType = [];

      const tagTypes = this.$static.abilityTags.edges.map((edge) => edge.node);
      tagTypes.forEach((tagType) => {
        const tags = tagType.tags.map((obj) => {
          labels.push(obj.name);
          data_tagType.push(obj.count);
        });
      });
      return {
        labels: labels,
        datasets: [{ data: data_tagType }],
      };
    },
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
