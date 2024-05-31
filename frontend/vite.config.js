import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  extends: ["eslint:recommended", "plugin:react/recommended"],
});
