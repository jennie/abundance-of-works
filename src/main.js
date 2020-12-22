require("~/css/main.css");

import DefaultLayout from "~/layouts/Default.vue";

import VueScrollTo from "vue-scrollto";
import VueLuxon from "vue-luxon";
import VueCharts from "vue-chartjs";

export default function(Vue, { router, head, isClient }) {
  head.htmlAttrs = { lang: "en" };

  head.bodyAttrs = {
    class: "min-h-screen subpixel-antialiased font-body bg-linen text-timber",
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
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
  });
  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&display=swap",
  });

  head.htmlAttrs = { lang: "en" };

  Vue.use(VueLuxon, {
    clientZone: "America/Toronto",
    serverZone: "America/Toronto",
    serverFormat: "iso",
    clientZone: "locale",
    clientFormat: "locale",
  });
}
