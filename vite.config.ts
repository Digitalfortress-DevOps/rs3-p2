import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"
import tailwindcss from "@tailwindcss/vite"
import netlify from "@netlify/vite-plugin"

export default defineConfig({
  plugins: [react(), tailwindcss(), netlify()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
