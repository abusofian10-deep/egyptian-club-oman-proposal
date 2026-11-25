import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standalone Web Proposal Microsite — works locally & on GitHub Pages subpath
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
});
