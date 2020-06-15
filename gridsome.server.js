const fs = require("fs");
const path = require("path");
const pick = require("lodash.pick");
const slugify = require("slugify");
const { pathPrefix } = require("./gridsome.config");
const luxon = require("luxon");

var DateTime = luxon.DateTime;
let d = DateTime.local();
let today = d.toISODate();
const axios = require("axios");
// const slugify = require("slugify");

module.exports = function(api, options) {
  api.createPages(async ({ graphql, createPage }) => {
    const { data } = await graphql(`
      {
        allWork {
          edges {
            node {
              title
              id
              year
              tags {
                name
              }
              creators {
                name
                type
              }
            }
          }
        }
      }
    `);
  });
};
