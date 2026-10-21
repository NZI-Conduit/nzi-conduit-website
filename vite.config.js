import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    process.env.ANALYZE && visualizer({
      filename: 'dist/bundle-stats.html',
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
      open: false,
    }),
  ].filter(Boolean),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/motion')) {
            return 'vendor-motion';
          }
        },
      },
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],
})
