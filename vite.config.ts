import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src'
    }
  },

  server: {
    host: '0.0.0.0',
    port: 5173
  },

  preview: {
    port: 4173
  },

  build: {
    target: 'es2023',
    sourcemap: true
  }
});