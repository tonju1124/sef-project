import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  
  // Development server configuration
  server: {
    port: 5173,
    
    // Proxy API requests to backend during development
    // This allows frontend to call /api/* and it gets forwarded to backend
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL || 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  
  // Build optimization
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser'
  }
})
