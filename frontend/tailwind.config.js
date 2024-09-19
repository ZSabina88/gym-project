/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "scale-up": "scaleUp 0.2s ease-in-out",
        "bg-success": "bgSuccess 0.3s ease-in-out",
      },
      keyframes: {
        scaleUp: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        bgSuccess: {
          "0%": { backgroundColor: "#1D4ED8" },
          "100%": { backgroundColor: "#9EF300" },
        },
      },
      colors: {
        customGreen: "#9EF300",
        borderColor: "#BDBDBD",
      },
    },
  },
  plugins: [],
};
