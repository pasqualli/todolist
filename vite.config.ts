import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react()
  ], // register the plugin
  server: {
    port: 3000,
  },
});
