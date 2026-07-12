import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// Consumed by Ladle to enable Tailwind v4 processing of the docs.
export default defineConfig({
  plugins: [tailwindcss()],
});
