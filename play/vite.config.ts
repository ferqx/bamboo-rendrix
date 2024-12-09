import { AliasOptions, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const devAlias: AliasOptions = {
  '@bamboo-rendrix/designer/dist/style.css': path.resolve(__dirname, '../packages/designer/dist/style.css'),
  '@bamboo-rendrix/renderer/dist/style.css': path.resolve(__dirname, '../packages/renderer/dist/style.css'),
  '@bamboo-rendrix/designer': path.resolve(__dirname, '../packages/designer/src/dev.ts'),
  '@bamboo-rendrix/canvas': path.resolve(__dirname, '../packages/canvas/src/index.ts'),
  '@bamboo-rendrix/renderer': path.resolve(__dirname, '../packages/renderer/src/index.ts'),
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        ...(isProd ? {} : devAlias),
      },
    },
  };
});
