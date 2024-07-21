import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  treeshake: true,
  splitting: true,
  format: ["esm", "cjs"],
  dts: true,
});
