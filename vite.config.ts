import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()], // Rimuovi il plugin di tailwind da qui
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
