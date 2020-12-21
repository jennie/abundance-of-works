<template>
  <div class=" mx-auto">
    <div class="flex flex-wrap">
      <div class="md:w-full lg:w-1/3">
        <div class="mt-4" v-for="tag in $static.allTag.edges" :key="tag.id">
          <div class="relative flex items-start">
            <div class="absolute flex items-center h-5">
              <input
                type="checkbox"
                :id="`tag-checkbox-${tag.node.name}`"
                class="form-checkbox h-4 w-4 text-timber transition duration-150 ease-in-out"
                @change="performSearch"
                :value="`${tag.node.id}`"
                v-model="tagSelected"
              />
            </div>
            <div class="pl-7 text-sm leading-5">
              <label
                :for="`tag-checkbox-${tag.node.name}`"
                class="text-xl font-regular text-gray-700"
                >{{ tag.node.name }}
              </label>
            </div>
          </div>
        </div>

        <div
          v-if="tagSelected.length > 0"
          class="top-0 right-0 text-2xl mr-3 cursor-pointer text-gray-600 hover:text-gray-800"
          style="top:2px;"
          @click="reset"
        >
          &times;
        </div>
      </div>

      <div class="md:w-full lg:w-2/3">
        <div
          v-if="tagSearchResults.length === 0 && tagSelected.length > 0"
          class="bg-form font-normal w-full cursor-pointer p-4 bg-gray-100 rounded shadow-md"
        >
          <p class="my-0">
            Nothing matches all of those tags. Try selecting fewer, or a
            different combination.
          </p>
        </div>
        <transition name="fade" v-else-if="tagSelected.length !== 0">
          <div class="divide-y divide-gray-400">
            <a
              v-for="(result, index) in tagSearchResults"
              :key="index"
              :href="result.item.path"
              @click="reset"
              class="py-4 flex items-baseline flex-wrap justify-start"
            >
              <span class="text-2xl text-left mr-2">{{
                result.item.title
              }}</span>
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
              v-if="tagSearchResults.length === 0"
              class="bg-form font-normal w-full border-b cursor-pointer p-4"
            ></div>
          </div>
        </transition>
      </div>
    </div>
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
import { format } from "util";
import Fuse from "fuse.js";

export default {
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
      tagSelected: [],
      tagSearchResults: [],
      // toggleActive: true,
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
      this.tagSelected = [];
      this.tagSearchResults = [];
    },
    performSearch() {
      const tagQuery = this.tagSelected.map((tagIds) => ({ tagIds }));
      const fuse = new Fuse(this.pages, this.options);
      this.tagSearchResults = fuse.search({
        $and: tagQuery,
      });
      return this.tagSearchResults;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
