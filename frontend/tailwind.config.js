/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "1250px",
        // ... other breakpoints
      },
      colors: {
        customGreen: "#9EF300",
        borderColor: "#BDBDBD",
      },
    },
  },
  plugins: [],
};
