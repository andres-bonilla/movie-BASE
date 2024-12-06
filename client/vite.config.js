import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_MOVIEBASE_API_URL || "http://localhost:3001",
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
    port: process.env.NODE_ENV === "development" ? "3000" : undefined,
  },
  build: {
    outDir: "deploy",
  },
});
/**/
