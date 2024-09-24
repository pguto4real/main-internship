/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "custom-green": "rgb(43, 217, 124)",
        "custom-gray": "rgb(109, 120, 125)",
      },
      gradientColorStops: (theme) => ({
        "range-progress": "var(--range-progress)",
      }),
    },
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      addUtilities({
        ".range-progress": {
          "--range-progress": "0%",
        },
      });
    },
  ],
  daisyui: {
    base: false, // applies background color and foreground color for root element by default
  },
};
