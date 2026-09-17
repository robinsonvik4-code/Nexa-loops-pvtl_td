import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const web3formsAccessKey =
    process.env.WEB3FORMS_ACCESS_KEY ||
    env.WEB3FORMS_ACCESS_KEY ||
    env.VITE_WEB3FORMS_ACCESS_KEY ||
    '';

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __WEB3FORMS_ACCESS_KEY__: JSON.stringify(web3formsAccessKey)
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3001',
          changeOrigin: false
        }
      }
    },
    build: {
      sourcemap: false
    }
  };
});
