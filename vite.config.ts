import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "dist",

    // 🔥 CLAVE para que NO se vea negro en móvil
    target: "es2017",

    // Evita minificación agresiva que rompe Safari
    minify: "esbuild",

    // Garantiza compatibilidad de chunks
    cssCodeSplit: true,

    // Evita problemas con lazy loading en móviles
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
