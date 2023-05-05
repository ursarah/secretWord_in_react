import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://ursarah.github.io/",
  plugins: [
    react()],
})
