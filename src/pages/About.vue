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
              <p class="mt-8 text-2xl font-bold">
                The Abundance is an outcome arising from the IndiVisible Report,
                a research project spearheaded by DM St. Bernard, Jivesh
                Parasram and Yvette Nolan with support from the Equity Office at
                the Canada Council for the Arts.
              </p>
              <p class="mt-4 text-xl">
                In 2015, the online database was housed at Ad Hoc Assembly as an
                embedded excel spreadsheet, frequently updated with
                contributions by members and the community. In 2016, we worked
                with Indigenous Performing Arts Alliance to incorporate the
                works from their Indigenous Body of Work.
              </p>
              <p class="mt-4 text-xl">
                2020, the list transitioned to the formalized Abundance of Works
                website as an outcome of the Knowledge Sharing Exchange,
                supported by the Canada Council for the Arts.
              </p>

              <div class="mt-8 praxis">
                <div class="inner">
                  <div class="heading">
                    <p class="mt-2 text-xl font-body font-bold">
                      Notes on praxis
                    </p>

                    <div class="flex flex-wrap">
                      <div>
                        <h4>
                          Identity Designations
                        </h4>
                        <p>
                          Designations have been sourced from publicly available
                          self-identification materials wherever possible (e.g.
                          program bio, artist website, media appearances). Broad
                          cultural categories are derived from the Canada
                          Council for the Arts’ designated priority groups. We
                          acknowledge the demand for nuance and further
                          specificity within such designations. Artists are
                          encouraged to select all categories that pertain to
                          their holistic identity. [Examples include, but are
                          not limited to: Indigenous, Asian, African, Latinx,
                          Middle Eastern, Deaf, disabled.]
                        </p>
                      </div>

                      <div>
                        <h4>Gender</h4>
                        <p>
                          We recognize the fluidity of gender identity and the
                          complexity of gender presentation. Gender designations
                          have been sourced from publicly available
                          self-identification materials wherever possible. These
                          designations are not static, and should not be
                          considered absolute or authoritative. They are
                          reflective of the artist’s self-identification at a
                          mere point in time.
                        </p>
                      </div>

                      <div>
                        <h4>Correction</h4>
                        <p>
                          We welcome and embrace correction. If you are an
                          artist seeking revision to the way that you or your
                          work are identified in this database, please do not
                          hesitate to reach out at
                          <a href="mailto:adhocassembly@gmail.com"
                            >adhocassembly@gmail.com</a
                          >
                        </p>
                      </div>

                      <div>
                        <h4>Data/Stats</h4>
                        <p>
                          These statistics are not scientific; we are not
                          statisticians. They represent an attempt to quantify
                          and bring visual perspective to what is gathered.
                        </p>
                      </div>

                      <div>
                        <h4>Submissions</h4>
                        <p>
                          This list is not exhaustive–it will grow as more
                          voices are added. Use the
                          <g-link to="/submit">
                            Submit a Work form
                          </g-link>
                          to contribute to our ever-prolific creative community.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3
                class="mt-12 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl"
              >
                Acknowledgments
              </h3>
              <div class="mt-5 prose text-xl">
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
              <div class="mt-5 prose text-xl">
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

<style lang="postcss">
h4 {
  @apply font-display font-bold text-xl text-cuttySark;
}
.praxis p {
  @apply text-xl;
}
</style>

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
