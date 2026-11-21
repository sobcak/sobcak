// @ts-check
import { defineConfig } from 'astro/config';

// Static build for Cloudflare Pages.
// Edge endpoints live in native Pages `/functions` (not Astro SSR).
export default defineConfig({
  site: 'https://sobcak.cz',
  output: 'static',
});
