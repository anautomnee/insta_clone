import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Ensure this matches your deployment path
  build: {
    outDir: 'dist'
  },
  plugins: [react()],
})
