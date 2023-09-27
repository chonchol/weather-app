/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue, js, ts, jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "weather-primary": "#136375",
        "weather-secondary": "#136375",
      },
      fontFamily: {
        Roboto: ["Roboto, sans-serif"]
      },
      container: {
        padding: "2rem",
        center: true,
      },
      screens: {
        sm: "640px",
        md: "768",
      }
    },
  },
  plugins: [],
}

