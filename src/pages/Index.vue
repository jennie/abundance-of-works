<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="text-center text-4xl font-bold">
        Abundance honours past, present, and future creators. We are here.
      </div>
      <div class="">
        <div class="grid grid-cols-3 g gap-20">
          <PieChart :chartdata="GenderData" :options="options"></PieChart>
          <PieChart :chartdata="RaceData" :options="options"></PieChart>
          <PieChart :chartdata="AbilityData" :options="options"></PieChart>
        </div>
      </div>
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
