import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['successful-emotion-production-2bc1.up.railway.app'],
    host: '0.0.0.0',
    port: 4173
  },
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
