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
            select: {
              filterByFormula: "Approved=TRUE()",
            },
            links: [
              {
                fieldName: "Creators",
                typeName: "Creator",
              },
              {
                fieldName: "Producers",
                typeName: "Producer",
              },
              {
                fieldName: "Publishers",
                typeName: "Publisher",
              },
              {
                fieldName: "Year",
                typeName: "Year",
              },
            ],
          },
          {
            name: "Creators",
            typeName: "Creator",
            select: {
              filterByFormula: "Approved=TRUE()",
            },
            links: [
              {
                fieldName: "Works",
                typeName: "Work",
              },
              {
                fieldName: "Tag Types",
                typeName: "TagTypes",
              },
              {
                fieldName: "Tags",
                typeName: "Tag",
              },
            ],
          },
          {
            name: "Producers",
            typeName: "Producer",
            links: [
              {
                fieldName: "Works",
                typeName: "Work",
              },
            ],
          },
          {
            name: "Publishers",
            typeName: "Publisher",
            links: [
              {
                fieldName: "Works",
                typeName: "Work",
              },
            ],
          },
          {
            name: "Tags",
            typeName: "Tag",
          },
          {
            name: "Tag Types",
            typeName: "TagTypes",
            links: [
              {
                fieldName: "Tags",
                typeName: "Tag",
              },
            ],
          },
          {
            name: "Years",
            typeName: "Year",
            links: [
              {
                fieldName: "Works",
                typeName: "Work",
              },
            ],
          },
        ],
        tableName: "Works",
      },
    },
  ],
  templates: {
    Work: "/work/:Title",
    Creator: "/creator/:Name",
    Tag: "/tag/:Name",
    Producer: "/producer/:Name",
    Publisher: "/publisher/:Name",
    Year: "/year/:Name",
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
