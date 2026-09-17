import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// CI 构建 GitHub Pages 时通过 BASE_PATH 传入项目子路径；本地开发保持根路径
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
