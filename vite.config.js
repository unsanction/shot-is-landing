var _a;
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
var buildDate = (_a = process.env.VITE_BUILD_DATE) !== null && _a !== void 0 ? _a : new Date().toISOString().slice(0, 10);
export default defineConfig(function (_a) {
    var isSsrBuild = _a.isSsrBuild;
    return ({
        plugins: [react()],
        define: {
            'import.meta.env.VITE_BUILD_DATE': JSON.stringify(buildDate),
        },
        build: isSsrBuild
            ? {}
            : {
                rollupOptions: {
                    output: {
                        manualChunks: {
                            react: ['react', 'react-dom'],
                        },
                    },
                },
            },
    });
});
