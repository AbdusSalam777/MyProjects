import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0', // 👈 important
    port: 5173       // optional (default bhi 5173 hota hai)
  },
  plugins: [react(),tailwindcss()],
})
