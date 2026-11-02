import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // đường dẫn tương đối để build xong có thể đặt ở bất kỳ thư mục/host nào
  base: './',
})
