<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div class="">
        <div>
          <pre>{{ JSON.stringify(myChartData, null, 2) }}</pre>
          <PieChart :chartdata="myChartData" :options="options"></PieChart>
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
{
  allWork {
    totalCount
  }
  allTagTypes {
    edges {
      node {
        name
        tags {
          count
          name
        }
      }
    }
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
      chartdata: {
        datasets: [
          {
            data: [10, 20, 30],
          },
        ],
        labels: ["Red", "Yellow", "Blue"],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  computed: {
    myChartData: function() {
      let labels = [];
      let data_tagType = [];

      const tagTypes = this.$static.allTagTypes.edges.map((edge) => edge.node);
      tagTypes.forEach((tagType) => {
        console.log(tagType.name);

        const tags = tagType.tags.map((obj) => {
          console.log(obj.count);
          labels.push(obj.name);
          data_tagType.push(obj.count);
        });
      });
      return {
        labels: labels,
        datasets: [{ data: data_tagType }],
      };

      // this.$static.allTagTypes.edges.forEach((edge) => {
      //   console.log(edge.node.tags);
      //   labels.push(edge.node.tags.name);
      //   data_tagType.push(edge.node.tags.count);
      // });
      // return {
      //   labels: labels,
      //   datasets: [data_tagType],
      // };
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
