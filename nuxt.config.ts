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
    public: {
      baserowWorksTableId: process.env.BASEROW_WORKS_TABLE_ID,
      baserowCreatorsTableId: process.env.BASEROW_CREATORS_TABLE_ID,
      baserowProducersTableId: process.env.BASEROW_PRODUCERS_TABLE_ID,
      baserowPublishersTableId: process.env.BASEROW_PUBLISHERS_TABLE_ID,
      baserowTagsTableId: process.env.BASEROW_TAGS_TABLE_ID,
      baserowTagTypesTableId: process.env.BASEROW_TAG_TYPES_TABLE_ID,
      baserowYearsTableId: process.env.BASEROW_YEARS_TABLE_ID,
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
  
  nitro: {
    preset: 'netlify-static'
  },
  
  ssr: true
})
