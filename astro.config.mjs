import preact from "@astrojs/preact";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://dafnik.github.io",
  base: "/npx-pnpm-redirect",
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
