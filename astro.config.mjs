// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static",
  vite: {
    plugins: [tailwindcss()],
    // Astro's prerender bundle imports clsx as an external package, but pnpm
    // doesn't hoist it to the project root, so bundle it in instead.
    resolve: { noExternal: ["clsx"] },
  },
});
