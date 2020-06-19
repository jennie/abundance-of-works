<template>
  <div class=" mx-auto">
    <div class="flex flex-wrap">
      <div class="md:w-full lg:w-1/3">
        <div v-for="tag in $static.allTag.edges" :key="tag.id">
          <div class="block">
            <label class="font-normal">
              <input
                type="checkbox"
                class="mr-2 leading-tight items-center"
                @change="performSearch"
                :value="`${tag.node.id}`"
                v-model="tagSelected"
              />
              <!-- On: "bg-indigo-600", Off: "bg-gray-200" -->

              <!-- <span
                role="checkbox"
                tabindex="0"
                aria-checked="false"
                @click="`() => setIsOn(!isOn)`"
                class="`${isOn ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`"
              ></span> -->
              <!-- On: "translate-x-5", Off: "translate-x-0" -->
              <!-- <span
                aria-hidden="true"
                class="`${isOn ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`"
              ></span> -->

              <span class="text-base">{{ tag.node.name }}</span>
            </label>
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
          class="bg-background-form font-normal w-full border-b cursor-pointer p-4 bg-gray-300"
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
              class="bg-background-form font-normal w-full border-b cursor-pointer p-4"
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
