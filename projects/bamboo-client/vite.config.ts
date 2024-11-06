import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@bamboo/designer/dist/style.css': path.resolve(__dirname, '../../packages/designer/dist/style.css'),
      '@bamboo/renderer/dist/style.css': path.resolve(__dirname, '../../packages/renderer/dist/style.css'),
      '@bamboo/designer': path.resolve(__dirname, '../../packages/designer/src/dev.ts'),
      '@bamboo/canvas': path.resolve(__dirname, '../../packages/canvas/src/index.ts'),
      '@bamboo/renderer': path.resolve(__dirname, '../../packages/renderer/src/index.ts'),
    },
  },
});
