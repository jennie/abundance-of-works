<template>
  <div class="relative mx-auto w-80">
    <search-focus @keyup="focusSearch"></search-focus>

    <div class="relative w-80">
      <input
        type="text"
        placeholder="Search"
        class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-timber text-timber placeholder-linen focus:placeholder-timber focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
        v-model="query"
        @input="softReset"
        @keyup="performSearch"
        @keyup.esc="searchResultsVisible = false"
        @keydown.up.prevent="highlightPrev"
        @keydown.down.prevent="highlightNext"
        @keyup.enter="gotoLink"
        @focus="searchResultsVisible = true"
        ref="search"
      />
      <!-- @blur="searchResultsVisible = false" -->
      <div class="absolute top-0 ml-3" style="top:10px">
        <svg
          fill="currentColor"
          class="text-mongoose h-5 w-5"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            class="heroicon-ui"
            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
          />
        </svg>
      </div>
      <div
        v-if="query.length > 0"
        class="absolute top-0 right-0 text-2xl mr-3 cursor-pointer text-gray-600 hover:text-gray-800"
        style="top:2px;"
        @click="reset"
      >
        &times;
      </div>
    </div>
    <transition name="fade">
      <div
        v-if="query.length > 0 && searchResultsVisible"
        class="normal-case absolute border left-0 right-0 w-108 text-left mb-4 mt-2 rounded-lg shadow overflow-hidden z-10 overflow-y-auto no-underline"
        style="max-height: 32rem"
      >
        <div class="flex flex-col" ref="results">
          <a
            v-for="(result, index) in results"
            :key="index"
            :href="result.item.path"
            @click="reset"
            class="search-result"
            :class="{ 'search-highlighted': index === highlightedIndex }"
          >
            <div class="flex justify-between">
              <div>
                {{ result.item.title }}
              </div>

              <div class="text-center uppercase text-sm font-normal">
                {{ result.item.type }}
              </div>
            </div>
          </a>

          <div
            v-if="results.length === 0"
            class="bg-form font-normal w-full border-b cursor-pointer p-4"
          >
            <p class="my-0">
              No results for '
              <strong>{{ query }}</strong
              >'
            </p>
          </div>
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
        }
      }
    }
    allCreator {
      edges {
        node {
          name
          path
        }
      }
    }
  }
</static-query>

<script>
import SearchFocus from "./SearchFocus";
import Fuse from "fuse.js";

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
          type: "work",
        });
      });
      const allCreators = this.$static.allCreator.edges.map(
        (edge) => edge.node
      );
      allCreators.forEach((page) => {
        result.push({
          path: page.path,
          title: page.name,
          type: "creator",
        });
      });
      return result;
    },
  },
  data() {
    return {
      query: "",
      results: [],
      highlightedIndex: 0,
      searchResultsVisible: false,
      options: {
        shouldSort: true,
        includeMatches: true,
        useExtendedSearch: true,
        ignoreLocation: true,
        threshold: 0.2,
        keys: ["title"],
      },
    };
  },
  methods: {
    reset() {
      this.query = "";
      this.highlightedIndex = 0;
    },
    softReset() {
      this.highlightedIndex = 0;
      this.searchResultsVisible = true;
    },
    performSearch() {
      const fuse = new Fuse(this.pages, this.options);
      this.results = fuse.search(this.query);
      return this.results;
    },
    highlightPrev() {
      if (this.highlightedIndex > 0) {
        this.highlightedIndex = this.highlightedIndex - 1;
        this.scrollIntoView();
      }
    },
    highlightNext() {
      if (this.highlightedIndex < this.results.length - 1) {
        this.highlightedIndex = this.highlightedIndex + 1;
        this.scrollIntoView();
      }
    },
    scrollIntoView() {
      this.$refs.results.children[this.highlightedIndex].scrollIntoView({
        block: "nearest",
      });
    },
    gotoLink() {
      if (this.results[this.highlightedIndex]) {
        window.location = this.results[this.highlightedIndex].item.url;
      }
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
  @apply bg-darkLinen border-b border-mongoose text-lg cursor-pointer p-4  no-underline leading-tight;
  .title {
    @apply block text-lg font-bold my-1;
  }
  .summary {
    @apply block font-normal text-sm my-1 text-linen;
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
  @apply bg-cuttySark text-linen;
}

.search-hover {
  @apply bg-linen;
}
</style>
