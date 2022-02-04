<template>
  <Layout>
    <div class="container-inner mx-auto py-16">
      <div
        v-if="submitted"
        class="p-3 text-white bg-green-400 font-bold text-center"
      >
        Thank you for your submission!
        <g-link to="/submit">Add another?</g-link>
      </div>

      <form
        name="web-submission"
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
          value="web-submission"
        />
        <p hidden>
          <label> Don't fill this out: <input name="bot-field" /> </label>
        </p>
        <div>
          <div>
            <div>
              <div class="heading">
                <div class="subhead">
                  Submit a work to the database
                </div>
                <p class="mt-1 text-lg leading-5">
                  This information will be reviewed by Ad Hoc Collective. Thank
                  you for taking the time to contribute!
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div class="sm:col-span-3">
                <label
                  for="title"
                  class="block text-lg font-bold text-timber leading-5"
                >
                  Title
                </label>
                <div class="mt-1 flex">
                  <input
                    id="title"
                    v-model="formData.title"
                    name="title"
                    class="text-xl py-3 px-4 block w-full shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border-pixie  rounded-md"
                  />
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="year"
                  class="block text-lg  leading-5 text-timber font-bold"
                >
                  Year
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    id="year"
                    v-model="formData.year"
                    name="year"
                    class="text-xl py-3 px-4 block w-full shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border-pixie rounded-md"
                  />
                </div>
              </div>

              <div class="sm:col-span-6">
                <label
                  for="about"
                  class="block text-lg font-medium leading-5 text-timber font-bold"
                >
                  Creator(s)
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <textarea
                    id="creators"
                    v-model="formData.creators"
                    name="creators"
                    rows="2"
                    class="py-3 px-4 block w-full shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border-pixie rounded-md"
                  ></textarea>
                </div>
                <p class="mt-2 text-lg text-mongoose">
                  Separate multiple creators with a comma. E.g.:
                  <em>nisha ahuja, Subtle Vigilance Collective</em>
                </p>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="producers"
                  class="block text-lg font-medium leading-5 text-timber font-bold"
                >
                  Producer(s)
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <textarea
                    id="producers"
                    v-model="formData.producers"
                    name="producers"
                    rows="2"
                    class="py-3 px-4 block w-full shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border-pixie rounded-md"
                  ></textarea>
                </div>
                <p class="mt-2 text-lg text-mongoose">
                  Separate multiple producers with a comma. E.g.:
                  <em>Buddies in Bad Times Theatre, Theatre Passe Muraille</em>
                </p>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="publishers"
                  class="block text-lg font-bold text-timber leading-5"
                >
                  Publisher(s)
                </label>
                <div class="mt-1 rounded-md shadow-sm">
                  <textarea
                    id="publishers"
                    v-model="formData.publishers"
                    name="publishers"
                    rows="2"
                    class="py-3 px-4 block w-full shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border-pixie rounded-md"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-8 border-t border-gray-200 pt-8">
            <div>
              <h3 class="text-xl leading-6 font-bold font-body mb-2">
                Tags
              </h3>
              <p class="mt-1 text-lg leading-5">
                Select any demographic/identity descriptors that apply to this
                work and its creators.
              </p>
            </div>
            <div class="mt-6">
              <fieldset class="flex flex-row flex-wrap">
                <div
                  class="mt-4 w-1/3 "
                  v-for="tag in $page.tags.edges"
                  :key="tag.id"
                >
                  <div class="relative flex items-start">
                    <div class="absolute flex items-center h-5">
                      <input
                        :id="`tag-checkbox-${tag.node.name}`"
                        :value="tag.node.name"
                        name="tags[]"
                        v-model="tags"
                        type="checkbox"
                        class="form-checkbox h-4 w-4 text-timber transition duration-150 ease-in-out"
                      />
                    </div>
                    <div class="pl-7 text-lg leading-5">
                      <label
                        :for="`tag-checkbox-${tag.node.name}`"
                        class="text-timber font-medium"
                        >{{ tag.node.name }}
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>

            <div class="mt-8 border-t border-gray-200 pt-8">
              <div>
                <h3 class="text-xl leading-6 font-bold font-body mb-2">
                  Contact
                </h3>

                <div
                  class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6"
                >
                  <div class="sm:col-span-3">
                    <label
                      for="email"
                      class="block text-lg font-medium leading-5 text-timber font-bold"
                    >
                      Email
                    </label>
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <input
                        id="email"
                        v-model="formData.email"
                        name="email"
                        class="flex-1 form-input block w-full min-w-0 rounded-md transition duration-150 ease-in-out sm:text-lg sm:leading-5 text-xl py-3 px-4 block w-full shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border-pixie  rounded-md"
                      />
                    </div>
                    <p class="mt-2 text-lg text-mongoose">
                      We may follow up if we have any questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 border-t border-gray-200 pt-5">
          <div class="flex justify-end">
            <span class="ml-3 inline-flex rounded-md shadow-sm">
              <button
                type="submit"
                class="inline-flex justify-center py-2 px-4 border border-transparent text-xl leading-5 font-medium rounded-md text-white bg-timber hover:bg-darkSeaGreen focus:outline-none focus:border-timber focus:ring-timber active:bg-timber transition duration-150 ease-in-out"
              >
                Submit
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
  tags: allTag(sortBy: "Name", order: DESC) {
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
          "form-name": e.target.getAttribute("name"),
          ...this.formData,
          tags: [this.tags],
        }),
      })
        .then((response) => {
          this.submitted = true;
          console.log(response);
        })
        .catch((error) => {
          console.log("====================================");
          console.log(`error in submiting the form data:${error}`);
          console.log("====================================");
        });
    },
  },
  data() {
    return {
      seo: {
        title: "Submit Work to Abundance of Works",
        description: "Add a work to the database.",
        image: `https://abundanceofworks.ca/images/abundance.png`,
      },
    };
  },
  metaInfo() {
    return {
      title: this.seo.title,
      meta: [
        {
          key: "title",
          name: "title",
          content: this.seo.title,
        },
        {
          key: "description",
          name: "description",
          content: this.seo.description,
        },
        {
          key: "twitter:card",
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          key: "twitter:image",
          name: "twitter:image",
          content: this.seo.image,
        },
        { key: "twitter:site", name: "twitter:site", content: "@jennie" },
        {
          key: "twitter:title",
          name: "twitter:title",
          content: this.seo.title,
        },
        {
          key: "twitter:description",
          name: "twitter:description",
          content: this.seo.description,
        },
        {
          key: "og:title",
          property: "og:title",
          content: this.seo.title,
        },
        {
          key: "og:description",
          property: "og:description",
          content: this.seo.description,
        },
        {
          key: "og:image",
          property: "og:image",
          content: this.seo.image,
        },
      ],
    };
  },
};
</script>
