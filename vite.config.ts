import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => ({
  base: '', // relative paths
  server: {
    port: 3000,
  },
  plugins: [
    react({
      babel: {
        plugins: [['styled-jsx/babel', { plugins: ['@styled-jsx/plugin-sass'] }]],
      },
    }),
  ],
  test: {
    environment: 'happy-dom',
  },
}));
