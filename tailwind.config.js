/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        dark_primary: "var(--dark-primary)",
        dark_secondary: "var(--dark-secondary)",
        dark_accent: "var(--dark-accent)",
        light: "var(--light)",
        dark: "var(--dark)",
      },
    },
  },
  plugins: [],
};
