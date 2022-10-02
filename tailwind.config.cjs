/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        200: "20em",
      },
      height: {
        180: "18em",
      },
      minHeight: {
        1.5: "1.5em",
      },
    },
  },
  plugins: [],
};
