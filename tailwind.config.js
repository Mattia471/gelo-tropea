/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Qui definiamo i font. Se non li hai ancora caricati via Google Fonts,
        // userà i default sans/serif del sistema.
        sans: ["Inter", ...fontFamily.sans],
        serif: ["Playfair Display", ...fontFamily.serif],
      },
      colors: {
        "tropea-red": "#8B2132",
        "tropea-cream": "#FDFCF0",
        "tropea-orange": "#FFB347",
        "tropea-dark": "#2D1414",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... aggiungi altre variabili se shadcn le richiede
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
