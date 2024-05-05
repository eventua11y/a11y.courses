import { defineConfig } from 'astro/config';

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  integrations: [sanity({
    projectId: "2g5zqxo3",
    dataset: "production",
    // Set useCdn to false if you're building statically.
    useCdn: false,
  })]
});