<template>
  <div>
    <div class="container-inner mx-auto py-16">
      <div
        v-if="submitted"
        class="p-3 text-white bg-green-400 font-bold text-center"
      >
        Thank you for your submission!
      </div>

      <form
        v-if="!submitted"
        name="submit-work"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        @submit.prevent="handleSubmit($event)"
        class="space-y-8"
      >
        <!-- Netlify Forms honeypot field -->
        <input type="hidden" name="form-name" value="submit-work" />
        <div style="display: none;">
          <label>Don't fill this out if you're human: <input name="bot-field" /></label>
        </div>
        <div>
          <div>
            <div>
              <div class="heading">
                <div class="subhead text-5xl font-bold leading-tight align-middle mt-2">
                  Submit a work to the database
                </div>
                <p class="mt-1 text-lg leading-5">
                  This information will be reviewed by Ad Hoc Collective. Thank
                  you for taking the time to contribute!
                </p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 mt-8">
              <div class="sm:col-span-2">
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
                    required
                    class="text-xl py-3 px-4 block w-full shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border border-pixie rounded-md"
                  />
                </div>
              </div>
              
              <div class="sm:col-span-2">
                <label
                  for="year"
                  class="block text-lg leading-5 text-timber font-bold"
                >
                  Year
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    id="year"
                    v-model="formData.year"
                    name="year"
                    type="number"
                    min="1900"
                    max="2030"
                    class="text-xl py-3 px-4 block w-full shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border border-pixie rounded-md"
                  />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label
                  for="creators"
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
                    required
                    class="py-3 px-4 block w-full shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border border-pixie rounded-md"
                  ></textarea>
                </div>
                <p class="mt-2 text-lg text-mongoose">
                  Separate multiple creators with a comma. E.g.:
                  <em>nisha ahuja, Subtle Vigilance Collective</em>
                </p>
              </div>
              
              <div class="sm:col-span-1">
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
                    class="py-3 px-4 block w-full shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border border-pixie rounded-md"
                  ></textarea>
                </div>
                <p class="mt-2 text-lg text-mongoose">
                  Separate multiple producers with a comma. E.g.:
                  <em>Buddies in Bad Times Theatre, Theatre Passe Muraille</em>
                </p>
              </div>
              
              <div class="sm:col-span-1">
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
                    class="py-3 px-4 block w-full shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border border-pixie rounded-md"
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
            <div class="mt-6" v-if="tagsData?.results">
              <fieldset class="flex flex-row flex-wrap">
                <div
                  class="mt-4 w-1/3"
                  v-for="tag in tagsData.results"
                  :key="tag.id"
                >
                  <div class="relative flex items-start">
                    <div class="absolute flex items-center h-5">
                      <input
                        :id="`tag-checkbox-${tag.id}`"
                        :value="tag.field_3973"
                        v-model="selectedTags"
                        type="checkbox"
                        class="form-checkbox h-4 w-4 text-timber transition duration-150 ease-in-out"
                      />
                    </div>
                    <div class="pl-7 text-lg leading-5">
                      <label
                        :for="`tag-checkbox-${tag.id}`"
                        class="text-timber font-medium"
                      >
                        {{ tag.field_3973 }}
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

                <div class="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
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
                        type="email"
                        required
                        class="flex-1 form-input block w-full min-w-0 rounded-md transition duration-150 ease-in-out sm:text-lg sm:leading-5 text-xl py-3 px-4 shadow-sm focus:ring-darkSeaGreen focus:border-darkSeaGreen border border-pixie rounded-md"
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
                :disabled="submitting"
                class="inline-flex justify-center py-2 px-4 border border-transparent text-xl leading-5 font-medium rounded-md text-white bg-timber hover:bg-darkSeaGreen focus:outline-none focus:border-timber focus:ring-timber active:bg-timber transition duration-150 ease-in-out disabled:opacity-50"
              >
                <span v-if="submitting">Submitting...</span>
                <span v-else>Submit</span>
              </button>
            </span>
          </div>
        </div>
      </form>

      <div v-if="error" class="mt-4 p-3 text-white bg-red-500 font-bold text-center">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const { fetchTable } = useBaserow()

// Form state
const submitted = ref(false)
const submitting = ref(false)
const error = ref('')

const formData = reactive({
  title: '',
  year: '',
  creators: '',
  producers: '',
  publishers: '',
  email: ''
})

const selectedTags = ref([])

// Fetch tags data
const { data: tagsData, pending: tagsPending } = await useLazyAsyncData('tags', () => 
  fetchTable(config.public.baserowTagsTableId, { size: 50 })
)

// Form submission using Netlify Forms
const handleSubmit = async (event) => {
  submitting.value = true
  error.value = ''

  try {
    // Create form data for Netlify Forms submission
    const formElement = event.target
    const formDataToSubmit = new FormData(formElement)
    
    // Add selected tags as a comma-separated string
    if (selectedTags.value.length > 0) {
      formDataToSubmit.set('tags', selectedTags.value.join(', '))
    }
    
    // Submit to Netlify Forms
    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formDataToSubmit).toString()
    })

    if (response.ok) {
      submitted.value = true
      
      // Reset form
      Object.keys(formData).forEach(key => {
        formData[key] = ''
      })
      selectedTags.value = []
    } else {
      throw new Error('Form submission failed')
    }

  } catch (err) {
    error.value = 'There was an error submitting your form. Please try again or contact us directly at adhocassembly@gmail.com'
    console.error('Submission error:', err)
  } finally {
    submitting.value = false
  }
}

useSeoMeta({
  title: 'Submit a Work - Abundance of Works',
  description: 'Submit information about theatrical works to expand our database'
})
</script>

<style lang="postcss">
.subhead {
  @apply font-display;
}
</style>