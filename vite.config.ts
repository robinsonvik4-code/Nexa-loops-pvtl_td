import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __WEB3FORMS_ACCESS_KEY__: JSON.stringify(process.env.WEB3FORMS_ACCESS_KEY || '')
  },
  server: {
    port: 3000,
    proxy: {'/api': {target: 'http://127.0.0.1:3001', changeOrigin: false}}
  },
  build: {
    sourcemap: false
  }
});
