import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2018",
    outDir: "dist",
    manifest: true,
    chunkSizeWarningLimit: 350,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          ui: ["lucide-react", "react-helmet-async"],
        },
      },
    },
  },
});
