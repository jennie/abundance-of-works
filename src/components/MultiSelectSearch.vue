<template>
  <div class=" mx-auto">
    <search-focus @keyup="focusSearch"></search-focus>

    <div class="">
      <div v-for="tag in $static.allTag.edges" :key="tag.id">
        <div class="block">
          <label class="font-normal">
            <input
              type="checkbox"
              class="mr-2 leading-tight items-center"
              @change="performSearch"
              :value="tag.node.id"
              v-model="query"
            />
            <span class="text-xl">{{ tag.node.name }}</span>
          </label>
        </div>
      </div>

      <div
        v-if="query.length > 0"
        class="top-0 right-0 text-2xl mr-3 cursor-pointer text-gray-600 hover:text-gray-800"
        style="top:2px;"
        @click="reset"
      >
        &times;
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="query.length > 0 && searchResultsVisible"
        class="normal-case left-0 right-0 w-full text-left mb-4 mt-2 overflow-hidden z-10 overflow-y-auto no-underline"
      >
        <div class="flex flex-col" ref="results">
          <a
            v-for="(result, index) in results"
            :key="index"
            :href="result.path"
            @click="reset"
            class="search-result"
          >
            <div class="flex justify-between">
              <div class="text-gray-700">
                {{ result.item.title }} -- {{ result.score }}
                <span
                  v-for="tag in result.item.tags"
                  :key="tag.id"
                  class="rounded font-normal bg-teal-100 px-2 mr-2"
                >
                  {{ tag.name }}
                </span>
              </div>
            </div>
          </a>

          <div
            v-if="results.length === 0"
            class="bg-background-form font-normal w-full border-b cursor-pointer p-4"
          ></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<static-query>
  query Search {
    allWork  {
      edges {
        node {
          id
          path
          title
          nameFromTags
          tags {
            name
            id
          }
        }
      }
    }
    allTag {
      edges {
        node {
          name
          path
          id
        }
      }
    }
  }
</static-query>

<script>
import SearchFocus from "./SearchFocus";
import { format } from "util";

export default {
  components: {
    SearchFocus,
  },
  computed: {
    pages() {
      let result = [];
      const allWorks = this.$static.allWork.edges.map((edge) => edge.node);
      allWorks.forEach((page) => {
        result.push({
          path: page.path,
          title: page.title,
          tags: page.tags,
          id: page.id,
        });
      });

      return result;
    },
  },
  data() {
    return {
      query: [],
      results: [],
      searchResultsVisible: true,
      options: {
        tokenize: true,
        includeScore: true,
        shouldSort: true,
        findAllMatches: true,
        keys: ["tags.id"],
      },
    };
  },
  methods: {
    reset() {
      this.query = [];
      this.highlightedIndex = 0;
    },
    performSearch() {
      // var tagQuery = this.query.join(" ");
      var tagQuery = this.query.join(" ");
      this.$search(tagQuery, this.pages, this.options).then((results) => {
        this.results = results;
      });
    },

    focusSearch(e) {
      if (e.key === "/") {
        this.$refs.search.focus();
      }
    },
  },
};
</script>

<style scoped lang="postcss">
.search-result {
  @apply bg-white border-b border-gray-400 text-lg cursor-pointer p-4 search-hover no-underline leading-tight;
  .title {
    @apply block text-lg font-bold my-1;
  }
  .summary {
    @apply block font-normal text-sm my-1 text-black;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.search-highlighted {
  @apply bg-green-100;
}

.search-hover {
  @apply bg-green-200;
}
</style>
