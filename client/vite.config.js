import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    proxy: {
      "/api": {
        target: process.env.MOVIEBASE_API,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
    port: process.env.NODE_ENV === "development" ? "3000" : undefined,
  },
  build: {
    outDir: "deploy",
  },
});
/**/
