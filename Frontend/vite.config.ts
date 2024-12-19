import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/auth': {
                target: 'http://localhost:3000', // URL backend
                changeOrigin: true,
                secure: false,
            },
        },
    },
});