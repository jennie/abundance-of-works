const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.vue", "./**/main.js"],
  plugins: [require("@tailwindcss/ui")],
  theme: {
    extend: {
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
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],

      serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      mono: [
        '"PT Mono"',
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace",
      ],
    },
  },
};
