const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.vue", "./**/main.js"],
  plugins: [
    require("@tailwindcss/ui"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
  variants: {
    extend: {
      backgroundColor: ["checked"],
      borderColor: ["checked"],
    },
  },
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        linen: "#F8F2E8",
        darkLinen: "#E8DDCA",
        mongoose: "#B59E7D",
        pixie: "#B5CAA5",
        darkSeaGreen: "#8FBC8F",
        cuttySark: "#56887D",
        timber: "#34403A",
      },
      spacing: {
        "80": "20rem",
        "108": "27rem",
      },
      borderWidth: {
        "14": "14px",
      },
    },
    container: {
      padding: "1rem",
    },
    fontFamily: {
      sans: ["Barlow"],
      body: ["Barlow"],
      display: ["Editorial New"],
    },
  },
};
