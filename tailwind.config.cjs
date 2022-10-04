/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        200: "20em",
        450: "450px",
        458: "458px",
        550: "550px",
      },
      height: {
        180: "18em",
        500: "500px",
      },
      minHeight: {
        1.5: "1.5em",
        24: "100px",
      },
    },
  },
  plugins: [],
};
