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
      '@bamboo-code/canvas': path.resolve(__dirname, '../canvas/src/index.ts'),
      '@bamboo-code/renderer': path.resolve(__dirname, '../renderer/src/index.ts'),
    },
  },
  build: {
    emptyOutDir: !isWatch,
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'bmDesigner',
      fileName: (format) => `bm-designer.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        exports: 'named',
      },
    },
  },
});
