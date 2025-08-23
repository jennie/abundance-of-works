// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  css: ['~/assets/main.css'],
  
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  
  runtimeConfig: {
    baserowToken: process.env.BASEROW_API_TOKEN,
    baserowUrl: process.env.BASEROW_API_URL || 'https://api.baserow.io',
    // Field IDs for submit form
    baserowWorksTitleFieldId: process.env.BASEROW_WORKS_TITLE_FIELD_ID,
    baserowWorksNotesFieldId: process.env.BASEROW_WORKS_NOTES_FIELD_ID,
    baserowWorksCreatorsFieldId: process.env.BASEROW_WORKS_CREATORS_FIELD_ID,
    baserowWorksYearFieldId: process.env.BASEROW_WORKS_YEAR_FIELD_ID,
    baserowWorksProducersFieldId: process.env.BASEROW_WORKS_PRODUCERS_FIELD_ID,
    baserowWorksPublishersFieldId: process.env.BASEROW_WORKS_PUBLISHERS_FIELD_ID,
    baserowWorksTagsFieldId: process.env.BASEROW_WORKS_TAGS_FIELD_ID,
    baserowWorksSubmittedByFieldId: process.env.BASEROW_WORKS_SUBMITTED_BY_FIELD_ID,
    baserowWorksImportedYearFieldId: process.env.BASEROW_WORKS_IMPORTED_YEAR_FIELD_ID,
    baserowWorksImportedProducerFieldId: process.env.BASEROW_WORKS_IMPORTED_PRODUCER_FIELD_ID,
    baserowWorksImportedPublisherFieldId: process.env.BASEROW_WORKS_IMPORTED_PUBLISHER_FIELD_ID,
    baserowCreatorsNameFieldId: process.env.BASEROW_CREATORS_NAME_FIELD_ID,
    baserowProducersNameFieldId: process.env.BASEROW_PRODUCERS_NAME_FIELD_ID,
    baserowPublishersNameFieldId: process.env.BASEROW_PUBLISHERS_NAME_FIELD_ID,
    baserowYearsNameFieldId: process.env.BASEROW_YEARS_NAME_FIELD_ID,
    public: {
      baserowWorksTableId: process.env.BASEROW_WORKS_TABLE_ID,
      baserowCreatorsTableId: process.env.BASEROW_CREATORS_TABLE_ID,
      baserowProducersTableId: process.env.BASEROW_PRODUCERS_TABLE_ID,
      baserowPublishersTableId: process.env.BASEROW_PUBLISHERS_TABLE_ID,
      baserowTagsTableId: process.env.BASEROW_TAGS_TABLE_ID,
      baserowTagTypesTableId: process.env.BASEROW_TAG_TYPES_TABLE_ID,
      baserowYearsTableId: process.env.BASEROW_YEARS_TABLE_ID,
      // Display field IDs for templates
      baserowWorksDisplayTitleFieldId: process.env.BASEROW_WORKS_DISPLAY_TITLE_FIELD_ID,
      baserowWorksDisplayCreatorsFieldId: process.env.BASEROW_WORKS_DISPLAY_CREATORS_FIELD_ID,
      baserowWorksDisplayProducersFieldId: process.env.BASEROW_WORKS_DISPLAY_PRODUCERS_FIELD_ID,
      baserowWorksDisplayPublishersFieldId: process.env.BASEROW_WORKS_DISPLAY_PUBLISHERS_FIELD_ID,
      baserowWorksDisplayYearFieldId: process.env.BASEROW_WORKS_DISPLAY_YEAR_FIELD_ID,
      baserowWorksDisplayAdaptedFromFieldId: process.env.BASEROW_WORKS_DISPLAY_ADAPTED_FROM_FIELD_ID,
      baserowWorksDisplayWithEnsembleFieldId: process.env.BASEROW_WORKS_DISPLAY_WITH_ENSEMBLE_FIELD_ID,
      baserowWorksDisplayImportedYearFieldId: process.env.BASEROW_WORKS_DISPLAY_IMPORTED_YEAR_FIELD_ID,
      baserowCreatorsDisplayNameFieldId: process.env.BASEROW_CREATORS_DISPLAY_NAME_FIELD_ID,
      baserowProducersDisplayNameFieldId: process.env.BASEROW_PRODUCERS_DISPLAY_NAME_FIELD_ID,
      baserowPublishersDisplayNameFieldId: process.env.BASEROW_PUBLISHERS_DISPLAY_NAME_FIELD_ID,
      baserowYearsDisplayNameFieldId: process.env.BASEROW_YEARS_DISPLAY_NAME_FIELD_ID,
      baserowTagsDisplayNameFieldId: process.env.BASEROW_TAGS_DISPLAY_NAME_FIELD_ID,
    }
  },
  
  app: {
    head: {
      title: 'Abundance of Works',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  
  // Full static generation - crawl and generate ALL pages
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true, // Generate every single page at build time
      failOnError: false,
      routes: ['/sitemap.xml']
    }
  },
  
  ssr: true
})
