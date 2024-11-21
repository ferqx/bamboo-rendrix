import { AliasOptions, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const devAlias: AliasOptions = {
  '@bamboo-code/designer/dist/style.css': path.resolve(__dirname, '../packages/designer/dist/style.css'),
  '@bamboo-code/renderer/dist/style.css': path.resolve(__dirname, '../packages/renderer/dist/style.css'),
  '@bamboo-code/designer': path.resolve(__dirname, '../packages/designer/src/dev.ts'),
  '@bamboo-code/canvas': path.resolve(__dirname, '../packages/canvas/src/index.ts'),
  '@bamboo-code/renderer': path.resolve(__dirname, '../packages/renderer/src/index.ts'),
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
