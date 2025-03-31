/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/frontend',
  server: {
    port: 5000,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: '../../dist/apps/frontend',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/frontend',
      provider: 'v8',
    },
  },
  resolve: {
    alias: {
      '@frontend/components': path.resolve(
        __dirname,
        './src/app/components/index.ts'
      ),
      '@frontend/pages': path.resolve(__dirname, './src/app/pages/index.ts'),
      '@frontend/store': path.resolve(__dirname, './src/app/store/index.ts'),
      '@frontend/src': path.resolve(__dirname, './src/app'),
      '@frontend/const': path.resolve(__dirname, './src/app/const.ts'),
      '@frontend/types': path.resolve(__dirname, './src/app/types'),
      '@project/shared': path.resolve(
        __dirname,
        '../../libs/shared/core/src/index-frontend.ts'
      ),
    },
  },
  // optimizeDeps: {
  //   include: ['@project/shared-client'],
  // },
});
