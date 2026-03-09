// Build script to create browser-compatible JavaScript bundles
import { ensureDir } from "@std/fs";
import * as path from "@std/path";
import * as esbuild from "esbuild";
import { denoPlugins } from "@luca/esbuild-deno-loader";
import { parse } from "@std/jsonc";

const outDir = "./dist";
const tempDir = "./.temp";

interface DenoConfig {
  name?: string;
  version?: string;
  imports?: Record<string, string>;
  [key: string]: unknown;
}

const denoConfig = parse(await Deno.readTextFile("./deno.json")) as DenoConfig;

const importMap = {
  imports: {
    ...denoConfig.imports,
  },
};

console.log("🔨 Building Elevation Core TypeScript bundles...");

// Create dist and temp directories if they don't exist
await ensureDir(outDir);
await ensureDir(tempDir);

const entryFile = path.join(tempDir, "bundle-entry.js");

// Create a wrapper entrypoint
const entryCode = `
// Temporary bundle entry point
export * from "../index.ts";
`;

await Deno.writeTextFile(entryFile, entryCode);

// Bundle the main entry point
console.log("📦 Bundling TypeScript code...");

try {
  const commonBuildOptions: esbuild.BuildOptions = {
    plugins: [
      ...denoPlugins({ importMapURL: `data:application/json,${JSON.stringify(importMap)}` }),
    ],
    entryPoints: ["file://" + path.resolve(entryFile)],
    bundle: true,
    platform: "neutral", // Works in both browser and Node.js
    treeShaking: true,
    external: [
      "@std/testing", // Don't bundle test dependencies
      "socket.io-client", // Mark Socket.io client as external for Node.js usage
      "@socket.io/component-emitter",
      "xmlhttprequest-ssl",
      "bufferutil",
      "utf-8-validate",
    ],
  };

  // Build ESM version
  await esbuild.build({
    ...commonBuildOptions,
    format: "esm",
    outfile: path.join(outDir, "index.js"),
  });

  console.log("✅ ESM bundle created successfully");

  // Build minified ESM version
  await esbuild.build({
    ...commonBuildOptions,
    format: "esm",
    outfile: path.join(outDir, "index.min.js"),
    minify: true,
    sourcemap: true,
  });

  console.log("✅ Minified ESM bundle created successfully");

  // Build CommonJS version for Node.js compatibility
  await esbuild.build({
    ...commonBuildOptions,
    format: "cjs",
    outfile: path.join(outDir, "index.cjs"),
  });

  console.log("✅ CommonJS bundle created successfully");

  // Build IIFE version for browser script tags
  await esbuild.build({
    ...commonBuildOptions,
    format: "iife",
    globalName: "ElevationCore",
    outfile: path.join(outDir, "elevation-core.js"),
  });

  console.log("✅ IIFE bundle created successfully");

  // Build minified IIFE version
  await esbuild.build({
    ...commonBuildOptions,
    format: "iife",
    globalName: "ElevationCore",
    outfile: path.join(outDir, "elevation-core.min.js"),
    minify: true,
    sourcemap: true,
  });

  console.log("✅ Minified IIFE bundle created successfully");

  console.log("✅ Build complete!");
  console.log(`📦 Bundles created at:
  - ${outDir}/index.js (ESM)
  - ${outDir}/index.min.js (Minified ESM)
  - ${outDir}/index.cjs (CommonJS)
  - ${outDir}/elevation-core.js (IIFE for script tags)
  - ${outDir}/elevation-core.min.js (Minified IIFE)`);
}
catch (error) {
  console.error("❌ Build failed:", error);
  Deno.exit(1);
}
finally {
  // Clean up temporary file and directory
  try {
    await Deno.remove(tempDir, { recursive: true });
    console.log("🧹 Cleaned up temporary directory.");
  }
  catch (cleanupError) {
    console.warn("⚠️ Could not clean up temporary directory:", (cleanupError as Error).message);
  }
  esbuild.stop();
}
