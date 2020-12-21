<template>
  <Layout>
    <div class="mx-auto pb-16">
      <main class="lg:relative">
        <div
          class="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:left-0 lg:w-1/2 lg:h-full"
        >
          <g-image
            class="absolute inset-0 w-full h-full object-cover"
            src="~/images/leaf.jpg"
            alt=""
          />
        </div>
        <div
          class="relative pt-12 pb-16 px-4 sm:pt-16 sm:px-6 lg:px-8 lg:max-w-7xl lg:mx-auto lg:grid lg:grid-cols-2"
        >
          <div class="lg:col-start-2 lg:pl-8">
            <div
              class="text-base max-w-prose mx-auto lg:max-w-lg lg:ml-auto lg:mr-0"
            >
              <h2 class="leading-6 text-cuttySark font-semibold text-xl">
                Abundance
              </h2>
              <h3
                class="mt-2 text-3xl leading-8 font-extrabold tracking-tight  sm:text-4xl"
              >
                Origin Story
              </h3>
              <p class="mt-8 text-lg">
                The Abundance is an outcome arising from the IndiVisible Report,
                a research project spearheaded by DM St. Bernard, Jivesh
                Parasram and Yvette Nolan with support from the Equity Office at
                the Canada Council for the Arts.
              </p>
              <p class="mt-4">
                In 2015, the online database was housed at Ad Hoc Assembly as an
                embedded excel spreadsheet, frequently updated with
                contributions by members and the community. In 2016, we worked
                with Indigenous Performing Arts Alliance to incorporate the
                works from their Indigenous Body of Work.
              </p>
              <p class="mt-4">
                2020, the list transitioned to the formalized Abundance of Works
                website as an outcome of the Knowledge Sharing Exchange,
                supported by the Canada Council for the Arts.
              </p>
              <h3
                class="mt-6 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl"
              >
                Acknowledgments
              </h3>
              <div class="mt-5 prose">
                <ul>
                  <li>
                    <strong>Website &amp; Database Design:</strong> Jennie
                    Robinson Faber
                  </li>
                  <li>
                    <strong>Abundance Steward &amp; Website Copy:</strong>
                    Natércia Napoleão
                  </li>
                  <li>
                    <strong>Concept &amp; Coordination:</strong> Donna-Michelle
                    St. Bernard
                  </li>
                </ul>
              </div>
              <div class="mt-5 prose">
                <p>
                  Thanks to Cole Alvis, Jenna Rodgers, Michael Man, and all of
                  the individuals and organizations who provided their
                  production histories back when it all began.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

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

<style lang="postcss"></style>

<static-query>
query tags {
  allWork {
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
