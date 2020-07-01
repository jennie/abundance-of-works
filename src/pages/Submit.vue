<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <form
        name="new-work-submission"
        method="POST"
        v-on:submit.prevent="handleSubmit"
        data-netlify="true"
        v-if="!submitted"
        data-netlify-honeypot="bot-field"
      >
        <input
          type="hidden"
          name="form-name"
          id="form-name"
          value="new-work-submission"
        />
        <p hidden>
          <label> Don't fill this out: <input name="bot-field" /> </label>
        </p>
        <div>
          <div>
            <div>
              <h3 class="text-2xl leading-6 font-medium text-gray-900 ">
                Submit a work to the database
              </h3>
              <p class="mt-1 text-sm leading-5 text-gray-500">
                This information will be reviewed by Ad Hoc Collective. We may
                follow up with you if we need more information. Thank you for
                taking the time to contribute!
              </p>
            </div>
            <div
              class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6"
            >
              <div class="sm:col-span-3">
                <label
                  for="title"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Title
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    id="title"
                    v-model="formData.title"
                    class="flex-1 form-input block w-full min-w-0 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="year"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Year
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    id="year"
                    v-model="formData.year"
                    class="flex-1 form-input block w-full min-w-0 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div class="sm:col-span-6">
                <label
                  for="about"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Creator(s)
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <textarea
                    id="creators"
                    v-model="formData.creators"
                    rows="2"
                    class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  ></textarea>
                </div>
                <p class="mt-2 text-sm text-gray-500">
                  Separate multiple creators with a comma. E.g.:
                  <em>nisha ahuja, Subtle Vigilance Collective</em>
                </p>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="producers"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Producer(s)
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <textarea
                    id="producers"
                    v-model="formData.producers"
                    rows="2"
                    class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  ></textarea>
                </div>
                <p class="mt-2 text-sm text-gray-500">
                  Separate multiple producers with a comma. E.g.:
                  <em>Buddies in Bad Times Theatre, Theatre Passe Muraille</em>
                </p>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="publishers"
                  class="block text-sm font-medium leading-5 text-gray-700"
                >
                  Publisher(s)
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <textarea
                    id="publishers"
                    v-model="formData.publishers"
                    rows="2"
                    class="form-textarea block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 border-t border-gray-200 pt-8">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Tags
              </h3>
              <p class="mt-1 text-sm leading-5 text-gray-500">
                Select any demographic/identity descriptors that apply to this
                work and its creators.
              </p>
            </div>
            <div class="mt-6">
              <fieldset>
                <div class="mt-4">
                  <div
                    class="mt-4"
                    v-for="tag in $page.tags.edges"
                    :key="tag.id"
                  >
                    <div class="relative flex items-start">
                      <div class="absolute flex items-center h-5">
                        <input
                          :id="`tag-checkbox-${tag.node.name}`"
                          :value="tag.node.name"
                          v-model="tags"
                          type="checkbox"
                          class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        />
                      </div>
                      <div class="pl-7 text-sm leading-5">
                        <label
                          :for="`tag-checkbox-${tag.node.name}`"
                          class="font-medium text-gray-700"
                          >{{ tag.node.name }}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <div class="mt-8 border-t border-gray-200 pt-5">
          <div class="flex justify-end">
            <span class="ml-3 inline-flex rounded-md shadow-sm">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                Save
              </button>
            </span>
          </div>
        </div>
      </form>
    </div>
  </Layout>
</template>

<page-query>
query {
  tags: allTag(sortBy: "name", order: DESC) {
    edges {
      node {
        name
        path
      }
    }
  }
}


</page-query>

<script>
export default {
  data() {
    return {
      submitted: false,

      formData: {},
      tags: [],
    };
  },
  watch: {
    $route(to, from) {
      this.submitted = false;
    },
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    handleSubmit(e) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": e.target
            .querySelector("#form-name")
            .getAttribute("value"),
          ...this.formData,
        }),
      })
        .then((response) => {
          this.submitted = true;
        })
        .catch((error) => {
          console.log("====================================");
          console.log(`error in submiting the form data:${error}`);
          console.log("====================================");
        });
    },
  },
  metaInfo() {
    return {
      title: "Submit a Work to Abundance of Works",
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
