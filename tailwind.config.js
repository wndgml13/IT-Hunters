/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fontBlack: "#191919",
        fontGray: "#4D4D4D",
        fontWhite: "#EBEBEB",
        barndYellow: "#F4C828",
        brandBlue: "#4B23B8",
        errorColor: "#F4C828",
        bgWhite: "#FFFFFF",
        bgGray1: "#F1F1F5",
        bgGray2: "#F8F8FA",
      },
    },
  },
  plugins: [],
};
