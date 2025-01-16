import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts()],
  resolve: {
    alias: {
      '@bamboo-rendrix/renderer': path.resolve(__dirname, '../renderer/src/index.ts'),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'bmCanvas',
      cssFileName: 'style',
      fileName: (format) => `bm-canvas.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'classnames', /@bamboo-rendrix\/*/],
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
