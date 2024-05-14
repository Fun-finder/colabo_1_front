import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
        followRedirects: true // 리디렉션된 요청에도 프록시를 적용
      }
    }
  }
})
