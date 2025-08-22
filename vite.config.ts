import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Inspect({
      build: true,
      outputDir: '.vite-inspect',
    }),
    {
      ...visualizer({
        filename: './dist/bundle-stats.html',
        template: 'treemap',
        gzipSize: true,
        brotliSize: true,
        open: true,
      }),
      apply: 'build',
    },
  ],
  resolve: {
    alias: {
      '@app': '/src/app',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@features': '/src/features',
      '@pages': '/src/pages',
      '@lib': '/src/lib',
      '@styles': '/src/styles',
      '@types': '/src/types',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@routes': '/src/routes',
    },
  },
  // build: {
  //   sourcemap: true,
  // },
});
