import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { fakeApiPlugin } from "./tools/fake-api";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), fakeApiPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
