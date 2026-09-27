import { defineConfig } from 'vite';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5173;

export default defineConfig({
  server: {
    port,
    host: '0.0.0.0',
    strictPort: false
  },
  preview: {
    port,
    host: '0.0.0.0',
    strictPort: false
  },
  build: {
    target: 'esnext'
  }
});

