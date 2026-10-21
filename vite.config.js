import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

import fs from 'fs'

function previewCleanUrls() {
  return {
    name: 'preview-clean-urls',
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : ''
        if (url && !path.extname(url)) {
          const cleanPath = url.replace(/^\//, '').replace(/\/$/, '')
          if (!cleanPath) {
            return next()
          }
          const nestedIndex = path.join(__dirname, 'dist', cleanPath, 'index.html')
          const directFile = path.join(__dirname, 'dist', `${cleanPath}.html`)

          if (fs.existsSync(nestedIndex)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            return fs.createReadStream(nestedIndex).pipe(res)
          } else if (fs.existsSync(directFile)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            return fs.createReadStream(directFile).pipe(res)
          } else {
            const notFoundFile = path.join(__dirname, 'dist', '404.html')
            if (fs.existsSync(notFoundFile)) {
              res.statusCode = 404
              res.setHeader('Content-Type', 'text/html; charset=utf-8')
              return fs.createReadStream(notFoundFile).pipe(res)
            }
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    previewCleanUrls(),
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
