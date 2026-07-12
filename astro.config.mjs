// @ts-check
import { defineConfig, sessionDrivers } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    imageService: 'compile'
  }),

  session: {
    driver: sessionDrivers.lruCache()
  },

  integrations: [react()],

  vite: {
    optimizeDeps: {
      exclude: ['astro/actions/runtime/entrypoints/server.js']
    }
  }
});
