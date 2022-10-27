import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import postCssPxToRem from 'postcss-pxtorem'
const config = {
  base: '/ichat/',
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 100, // 1rem的大小
          propList: ['*'] // 需要转换的属性，这里选择全部都进行转换
        })
      ]
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    }),
    AutoImport({
      dts: true,
      imports: ['vue', 'vue-router', 'pinia']
    }),
    Pages({
      importMode: 'async',
      routeStyle: 'nuxt',
      exclude: ['**/components/*.vue'],
      dirs: 'src/pages'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 6868,
    open: true,
    https: false,
    proxy: {}
  }
}
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    ...config
  }
  // if (command === 'serve') {
  //   return {
  //     // dev 独有配置
  //   }
  // } else {
  //   // command === 'build'
  //   return {
  //     // build 独有配置
  //   }
  // }
})
