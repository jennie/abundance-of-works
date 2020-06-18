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
              :value="`${tag.node.id}`"
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
      <div>
        <div class="divide-y divide-gray-400">
          <a
            v-for="(result, index) in results"
            :key="index"
            :href="result.item.path"
            @click="reset"
            class="py-4 flex items-baseline flex-wrap justify-start"
          >
            <span class="text-2xl text-left mr-2">{{ result.item.title }}</span>
            <div class="text-base font-normal">
              <template v-for="(value, index) in result.item.creators">
                <template v-if="index > 0"
                  >,
                </template>
                <span :key="index">{{ value.name }}</span>
              </template>
            </div>
            <!-- <span
                  v-for="tag in result.item.tags"
                  :key="tag.id"
                  class="rounded font-normal bg-teal-100 px-2 mr-2"
                >
                  {{ tag.name }}
                </span> -->
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
          creators {
            name
          }
          idFromTags
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
          creators: page.creators,
          tagIds: page.idFromTags,
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
        keys: ["tagIds"],
        useExtendedSearch: true,
        threshold: 0.0,
      },
    };
  },
  methods: {
    reset() {
      this.query = [];
      this.highlightedIndex = 0;
    },
    performSearch() {
      const tagQuery = this.query.map((tagIds) => ({ tagIds }));
      console.log(tagQuery);
      const fuse = new Fuse(this.pages, this.options);
      this.results = fuse.search({
        $and: tagQuery,
      });
      return this.results;
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
