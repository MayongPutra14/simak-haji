import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api-equran': {
        target: 'https://equran.id',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-equran/, ''),
      },
    },
  },
});
