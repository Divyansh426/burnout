
import devServer from "@hono/vite-dev-server";
import path from "path";
import { fileURLToPath } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { inspectAttr } from "kimi-plugin-inspect-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: path.resolve(__dirname, "frontend"),
  plugins: [
    devServer({
      entry: path.resolve(__dirname, "backend/api/boot.ts"),
      exclude: [/^\/(?!api\/).*$/],
    }),
    inspectAttr(),
    react(),
  ],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "frontend/src"),
      "@contracts": path.resolve(__dirname, "contracts"),
      "@db": path.resolve(__dirname, "backend/db"),
      db: path.resolve(__dirname, "backend/db"),
    },
  },
  envDir: __dirname,
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});