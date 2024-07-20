import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entryPoints: ["wagmi/index.ts"],
  format: ["cjs", "esm"],
  external: ["react"],
  dts: true,
  ...options,
}));