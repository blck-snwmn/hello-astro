// @ts-check
import { defineConfig, sessionDrivers } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: "compile",
  }),

  // Prevent the Cloudflare adapter from automatically provisioning KV.
  // This sample stores inquiry data only in a browser cookie.
  session: {
    driver: sessionDrivers.lruCache(),
  },

  integrations: [react()],

  i18n: {
    locales: ["en", "ja"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },

  vite: {
    optimizeDeps: {
      exclude: ["astro/actions/runtime/entrypoints/server.js"],
    },
  },
});
