import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
            "/public": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
    optimizeDeps: {
        include: ["@partchat/types"],
    },
    build: {
        commonjsOptions: {
            include: [/types/, /node_modules/],
        },
    },
});
