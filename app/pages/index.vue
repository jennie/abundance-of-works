<template>
  <div class="mx-auto pb-16">
    <main class="lg:relative">
      <div
        class="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div class="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
          <h1
            class="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <div
              class="text-4xl lg:text-6xl font-display lg:leading-snug leading-normal">
              <span class="block xl:inline">
                <span class="font-bold"
                  >Abundance honours past, present, and future creators.</span
                >
                <span class="font-medium block">We are here.</span>
              </span>
            </div>
          </h1>
          <p
            class="mt-3 max-w-md mx-auto text-lg sm:text-xl md:mt-5 md:max-w-3xl">
            The Abundance of Works is an aggregation of performance works by
            equity-seeking performing arts creators in Canada.
          </p>
          <div class="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div class="rounded-md shadow">
              <NuxtLink
                to="/works"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-linen bg-cuttySark hover:bg-timber md:py-4 md:text-lg md:px-10">
                Explore Works
              </NuxtLink>
            </div>
            <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <NuxtLink
                to="/submit"
                class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md bg-pixie hover:bg-darkSeaGreen md:py-4 md:text-lg md:px-10">
                Submit a Work
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div
        class="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <img
          class="absolute inset-0 w-full h-full object-cover"
          src="/leaf.jpg"
          alt="" />
      </div>
    </main>

    <section class="bg-pixie text-timber">
      <div class="inner flex flex-wrap w-full">
        <div class="flex-1">
          <span
            class="count text-4xl md:text-8xl font-body block text-center"
            >{{ stats.worksCount }}</span
          >
          <span class="text-2xl block text-center">Works</span>
        </div>
        <div class="flex-1">
          <span
            class="count text-4xl md:text-8xl font-body block text-center"
            >{{ stats.creatorsCount }}</span
          >
          <span class="text-2xl block text-center">Creators</span>
        </div>
      </div>
      <div class="inner">
        <div class="heading">
          <p class="mt-2 text-xl font-body font-bold max-w-2xl">
            The Abundance of Works is an attempt to document every existing
            Canadian play by equity-seeking playwrights.
          </p>
          <div class="mt-5 text-2xl max-w-5xl prose leading-normal">
            <p>
              In most cases, we have tried to identify the premiering theatre.
              Please note that while some works have received public
              presentations, they may not have been fully produced thus far.
            </p>
            <p>
              This list incorporates the works in the Living Fire (formerly the
              Indigenous Body of Work), which was created in collaboration with
              Indigenous Performing Arts Alliance, Banff Centre for the Arts and
              the National Arts Centre English Theatre during
              <a
                href="https://nac-cna.ca/en/cycle/indigenous/summit"
                target="_blank"
                >The Summit: Indigenous Theatre</a
              >.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { fetchTable } = useBaserow();

// Fetch statistics during build time
const { data: worksData } = await useLazyAsyncData('works-stats', () => 
  fetchTable(config.public.baserowWorksTableId, { size: 1 })
);

const { data: creatorsData } = await useLazyAsyncData('creators-stats', () => 
  fetchTable(config.public.baserowCreatorsTableId, { size: 1 })
);

const stats = computed(() => ({
  worksCount: worksData.value?.count || 0,
  creatorsCount: creatorsData.value?.count || 0,
}));

// SEO
useSeoMeta({
  title: "Abundance of Works",
  description:
    "Abundance honours past, present, and future creators. We are here. The Abundance of Works is an aggregation of performance works by equity-seeking performing arts creators in Canada.",
  ogTitle: "Abundance of Works",
  ogDescription:
    "Abundance honours past, present, and future creators. We are here. The Abundance of Works is an aggregation of performance works by equity-seeking performing arts creators in Canada.",
  ogImage: "https://abundanceofworks.ca/images/abundance.png",
  twitterCard: "summary_large_image",
  twitterTitle: "Abundance of Works",
  twitterDescription:
    "Abundance honours past, present, and future creators. We are here. The Abundance of Works is an aggregation of performance works by equity-seeking performing arts creators in Canada.",
  twitterImage: "https://abundanceofworks.ca/images/abundance.png",
  twitterSite: "@jennie",
});
</script>

<style lang="postcss">
main {
  .post-link {
    @apply text-gray-800 font-normal leading-normal;
  }
  .source a:not(.btn) {
    @apply text-gray-800 font-normal leading-normal;
  }
}
section {
  @apply relative px-4;
  @screen sm {
    @apply px-6;
  }
  @screen lg {
    @apply px-8;
  }
  .inner {
    @apply mx-auto max-w-7xl w-full pb-20;
    &:first-child {
      @apply pt-16;
    }
    @screen lg {
      @apply pb-40 text-left;
      &:first-child {
        @apply pt-40;
      }
    }
  }
  h4 {
    @apply font-display font-bold text-xl text-cuttySark;
  }
}
</style>
