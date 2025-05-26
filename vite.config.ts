import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: 'src/frontend',
  build: {
    outDir: '../../dist/frontend',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4201',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});