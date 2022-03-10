// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  server: {
    port: 8080,
  },
  build: {
    minify: true,
  },
  base: '',
});
