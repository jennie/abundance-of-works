// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from "~/layouts/Default.vue";

import VueScrollTo from "vue-scrollto";
import VueLuxon from "vue-luxon";
import VueCharts from "vue-chartjs";

export default function(Vue, { router, head, isClient }) {
  head.htmlAttrs = { lang: "en" };
  head.bodyAttrs = {
    class: "text-base flex flex-col min-h-screen text-gray-900 antialiased",
  };

  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.use(VueCharts);

  Vue.use(VueScrollTo, {
    duration: 500,
    easing: "ease",
  });

  var marked = require("marked");
  marked.setOptions({
    smartypants: true,
    gfm: true,
  });
  Vue.mixin({
    methods: {
      marked: function(input) {
        return marked(input);
      },
    },
  });

  head.meta.push({
    name: "author",
    content: "AD HOC Assembly",
  });

  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=PT+Serif:400,400i,700|Roboto:400,400i,900&display=swap",
  });
  Vue.use(VueLuxon, {
    clientZone: "America/Toronto",
    serverZone: "America/Toronto",
    serverFormat: "iso",
    clientZone: "locale",
    clientFormat: "locale",
  });
}
