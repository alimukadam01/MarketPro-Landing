import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// Vite config: React plugin + `@/…` path alias mirroring tsconfig `paths`.
// The lead form POSTs directly to the Market Pro backend's contact endpoint
// (backend.market-pro.pk/contact/), so no local API proxy is needed.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
})
