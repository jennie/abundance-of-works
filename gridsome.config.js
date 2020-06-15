const postcssNested = require("postcss-nested");
const tailwind = require("tailwindcss");
const postcssPlugins = [tailwind(), postcssNested];
require("dotenv").config();

module.exports = {
  siteName: "Abundance of Works",
  siteDescription: "",
  siteUrl: "",
  cacheBusting: false,

  plugins: [
    {
      use: "@gridsome/source-airtable",
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        base: process.env.BASE_ID,
        tables: [
          {
            name: "Works",
            typeName: "Work",
            select: {},
            links: [
              {
                fieldName: "Creators",
                typeName: "Creator",
              },
              {
                fieldName: "Tags",
                typeName: "Tag",
              },
              {
                fieldName: "Producers",
                typeName: "Producer",
              },
              {
                fieldName: "Publishers",
                typeName: "Publisher",
              },
            ],
          },
          {
            name: "Creators",
            typeName: "Creator",
          },
          {
            name: "Producers",
            typeName: "Producer",
          },
          {
            name: "Publishers",
            typeName: "Publisher",
          },
          {
            name: "Tags",
            typeName: "Tag",
          },
        ],
        tableName: "Works",
      },
    },
  ],
  templates: {
    Work: "/work/:Title",
  },
  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
};
