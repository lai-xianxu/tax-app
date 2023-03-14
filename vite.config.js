import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  base: './',
  plugins: [
    vue(),
    // vant配置
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    // 路径别名
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    // 是否开启 https
    https: false,
    // 端口号
    port: 9999,
    // 监听所有地址
    host: '0.0.0.0',
    // 服务启动时是否自动打开浏览器
    // open: true,
    // 允许跨域
    cors: true,
    // 自定义代理规则
    proxy: {
      '/proxy_api': {
        target: 'http://api.ump45.top:19011', // 代理接口
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy_api/, ''),
      },
    },
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 mixin.scss 这样就可以在全局中使用 mixin.scss中预定义的变量了
        // 给导入的路径最后加上 ;
        additionalData: '@import "@/style/mixin.scss";',
      },
    },
  },
  build: {
    // 设置最终构建的浏览器兼容目标
    target: 'es2015',
    // 构建后是否生成 source map 文件
    sourcemap: false,
    //  chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 2000,
    // 启用/禁用 gzip 压缩大小报告
    reportCompressedSize: false,
    // 自定义底层的 Rollup 打包配置
    rollupOptions: {
      // 静态资源分类打包
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
});
