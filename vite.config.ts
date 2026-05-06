import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const buildDate = process.env.VITE_BUILD_DATE ?? new Date().toISOString().slice(0, 10);

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_BUILD_DATE': JSON.stringify(buildDate),
  },
  build: isSsrBuild
    ? {}
    : {
        rollupOptions: {
          output: {
            manualChunks: {
              react: ['react', 'react-dom'],
            },
          },
        },
      },
}));
