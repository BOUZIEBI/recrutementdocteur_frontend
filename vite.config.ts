import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    'import.meta.env.REDIRECTION_APRES_CONNEXION': JSON.stringify(
      process.env.REDIRECTION_APRES_CONNEXION
        ?? loadEnv(mode, process.cwd(), 'REDIRECTION_APRES_CONNEXION').REDIRECTION_APRES_CONNEXION
        ?? '/',
    ),
    'import.meta.env.SECRET_KEY': JSON.stringify(
      process.env.SECRET_KEY ?? loadEnv(mode, process.cwd(), 'SECRET_KEY').SECRET_KEY ?? '',
    ),
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyRequest, request) => {
            const authorization = request.headers.authorization;
            if (typeof authorization === 'string' && authorization.trim()) {
              proxyRequest.setHeader('Authorization', authorization);
            }
          });
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    sourcemap: false,
    minify: "esbuild",
  },
}));
