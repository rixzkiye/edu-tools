import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://edu-tools.example.com',
  integrations: [
    tailwind(),
    mdx(),
    sitemap()
  ],
  i18n: {
    defaultLocale: 'id',
    locales: ['id', 'en', 'zh'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    optimizeDeps: {
      include: ['gsap', 'three', 'tone', 'fuse.js', 'html2canvas']
    }
  }
});
