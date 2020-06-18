<template>
  <div class=" mx-auto">
    <search-focus @keyup="focusSearch"></search-focus>

    <div>
      <button @click="performSearch">Perform Search</button>
      <input
        type="checkbox"
        @change="performSearch"
        value="Indigenous"
        v-model="query"
      />
      <label for="Indigenous">Indigenous</label>
      <input
        type="checkbox"
        @change="performSearch"
        value="female"
        v-model="query"
      />
      <label for="female">female</label>
      <input
        type="checkbox"
        @change="performSearch"
        value="Disabled"
        v-model="query"
      />
      <label for="Disabled">disabled</label>
      <br />
      <!-- <input
        type="text"
        placeholder="Search"
        class="bg-background-form border border-gray-500 rounded-full px-4 pl-10 py-2 outline-none focus:border-gray-500 w-80"
        v-model="tagQuery"
        @input="softReset"
        @keyup="performSearch"
        @keyup.esc="searchResultsVisible = false"
        @keydown.up.prevent="highlightPrev"
        @keydown.down.prevent="highlightNext"
        @keyup.enter="gotoLink"
        @blur="searchResultsVisible = false"
        @focus="searchResultsVisible = true"
        ref="search"
      /> -->

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
            :href="result.item.path"
            @click="reset"
            class="search-result"
            :class="{ 'search-highlighted': index === highlightedIndex }"
          >
            <div class="flex justify-between">
              <div class="text-gray-700">
                {{ result.item.title }}
              </div>

              <div
                class="text-gray-600 text-center uppercase text-sm font-normal"
              >
                {{ result.item.type }}
              </div>
            </div>
          </a>

          <div
            v-if="results.length === 0"
            class="bg-background-form font-normal w-full border-b cursor-pointer p-4"
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
          nameFromTags
          
        }
      }
    }
   
  }
</static-query>

<script>
import SearchFocus from "./SearchFocus";

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
          tags: page.nameFromTags,
          type: "work",
        });
      });

      return result;
    },
  },
  data() {
    return {
      query: [],
      tagquery: "",
      results: [],
      highlightedIndex: 0,
      searchResultsVisible: false,
      options: {
        keys: ["tags"],
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
      this.$search(this.query.join(" "), this.pages, this.options).then(
        (results) => {
          this.results = results;
        }
      );
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
