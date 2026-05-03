import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/register': 'http://localhost:5000',
      '/login': 'http://localhost:5000',
      '/add-issue': 'http://localhost:5000',
      '/issues': 'http://localhost:5000',
      '/update-status': 'http://localhost:5000',
    }
  }
})
