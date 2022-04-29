import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.json', '.ts'], // 使用路径别名时想要省略的后缀名
    },
    plugins: [vue()],
})
