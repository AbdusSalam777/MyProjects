import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Honour PORT when the environment assigns one, otherwise Vite's default.
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
  build: {
    // Three.js is lazy-loaded into its own chunk; the warning is expected.
    chunkSizeWarningLimit: 1000,
  },
})
