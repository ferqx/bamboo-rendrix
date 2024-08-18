import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// 判断是否是--watch
const isWatch = process.argv.includes('--watch');

export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: !isWatch,
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'designer',
      fileName: (format) => `designer.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@bamboo/components': 'materialLibrary',
        },
      },
    },
  },
});
