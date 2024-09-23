const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],

  theme: {
    extend: {
      colors: {
        gray: colors.stone,
      },
      backgroundImage: {
        inventory: "url('/assets/images/inventory-cover.jpg')",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
