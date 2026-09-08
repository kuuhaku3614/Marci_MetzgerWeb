import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  /*
   * GitHub Pages serves this project site from /<repo>/, so a production build
   * needs that prefix or every asset 404s. The repo name is read from
   * GITHUB_REPOSITORY ("owner/repo"), which Actions sets for us — hard-coding
   * it meant that renaming the repository silently broke every published
   * asset path while the workflow still reported success. Local dev and local
   * builds stay on "/". Anything under /public resolves through
   * src/lib/asset.js, which reads the same base at runtime.
   */
  const repo = process.env.GITHUB_REPOSITORY?.split('/')[1]

  return {
    base: command === 'build' && repo ? `/${repo}/` : '/',
    plugins: [react(), tailwindcss()],
  }
})
