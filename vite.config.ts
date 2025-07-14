import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // 使用相对路径
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    assetsInlineLimit: 0, // 不内联任何资源
    cssCodeSplit: false, // 将CSS合并成一个文件
    rollupOptions: {
      output: {
        manualChunks: undefined, // 禁用代码分割
      },
    },
  }
});
