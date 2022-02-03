<template>
  <div class="container-inner ">
    <div class="flex justify-around">
      <div class="relative flex flex-wrap">
        <div v-for="tag in $static.allTag.edges" :key="tag.id" class="m-1">
          <label :for="`tag-checkbox-${tag.node.name}`">
            <div
              class="text-lg leading-5 px-3 py-2 rounded-full cursor-pointer transition duration-150
              ease-in-out"
              :class="{
                'bg-darkLinen hover:bg-pixie': !tagSelected.includes(
                  tag.node.id
                ),
                'bg-pixie hover:bg-darkSeaGreen': tagSelected.includes(
                  tag.node.id
                ),
              }"
            >
              {{ tag.node.name }}
              <input
                type="checkbox"
                :id="`tag-checkbox-${tag.node.name}`"
                class="hidden appearance-none checked:bg-cuttySark checked:border-transparent"
                @change="performSearch"
                :value="`${tag.node.id}`"
                v-model="tagSelected"
              />
            </div>
          </label>
        </div>

        <div
          v-if="tagSelected.length > 0"
          class=" mt-1 text-center text-2xl mr-3 cursor-pointer text-black hover:text-red-700 hover:bg-red-300 rounded-full h-5 w-5 leading-4 bg-red-200"
          @click="reset"
        >
          <span class="right-0 left-0 text-center mx-auto relative"
            >&times;</span
          >
        </div>
      </div>
    </div>
    <div class="pt-6">
      <div
        v-if="tagSearchResults.length === 0 && tagSelected.length > 0"
        class="bg-form font-normal w-full  p-4 bg-gray-100 rounded shadow-md"
      >
        <p class="my-0">
          Nothing matches all of those tags. Try selecting fewer, or a different
          combination.
          <span @click="reset" class="cursor-pointer underline">
            Clear selections.
          </span>
        </p>
      </div>
      <div
        v-else-if="tagSearchResults.length === 0"
        class="text-center text-2xl mx-auto"
      >
        To filter by tags on a creator, click one or two above.
      </div>
      <div name="fade" v-else-if="tagSelected.length !== 0">
        <div class="heading">
          <div class="subhead">
            All creators tagged
          </div>
          <h1>
            <span
              v-for="tag in tagSelectedNames"
              class="tagAppend"
              :key="tag.id"
            >
              {{ tag.name }}
            </span>
          </h1>
        </div>
        <div class="divide-y divide-darkLinen">
          <a
            v-for="(result, index) in tagSearchResults"
            :key="index"
            :href="result.item.path"
            @click="reset"
            class="py-4 flex items-baseline flex-wrap justify-start"
          >
            <span
              class="text-2xl font-display underline font-bold text-left mr-2"
              >{{ result.item.name }}</span
            >
            <div class="text-base font-normal">
              <template v-for="(value, index) in result.item.works">
                <template v-if="index > 0"
                  >,
                </template>
                <span :key="index">{{ value.title }}</span>
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
      </div>
    </div>
  </div>
</template>

<static-query>
query Search {
  allCreator {
      edges {
        node {
          id
          path
          name
          works {
            title
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
    tagSelectedNames() {
      let result = [];
      const allTags = this.$static.allTag.edges.map((edge) => edge.node);

      this.tagSelected.forEach((tagId) => {
        const tag = allTags.find(({ id }) => id === tagId);
        result.push({ name: tag.name });
      });
      return result;
    },

    pages() {
      let result = [];
      const allCreators = this.$static.allCreator.edges.map(
        (edge) => edge.node
      );
      allCreators.forEach((page) => {
        result.push({
          path: page.path,
          name: page.name,
          works: page.works,
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
.tagAppend {
  &::after {
    content: "&";
    @apply font-medium;
  }
  &:last-child::after {
    content: "";
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
</style>
