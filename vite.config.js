import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  /*
   * GitHub Pages serves this project site from /<repo>/, so a production build
   * needs that prefix or every asset 404s. Local dev stays on "/" so the dev
   * server URL is unchanged. Anything under /public is resolved through
   * src/lib/asset.js, which reads the same base at runtime.
   */
  base: command === 'build' ? '/Marci_Metzger_RevampedWeb/' : '/',
  plugins: [react(), tailwindcss()],
}))
