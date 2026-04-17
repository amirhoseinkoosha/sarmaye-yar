/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#0a0f1a",
        darkCard: "#111827",
        neonBlue: "#38bdf8",
        neonGreen: "#4ade80",
      },
    },
  },
  plugins: [],
};
