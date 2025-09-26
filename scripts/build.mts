import * as esbuild from "esbuild";
import path from "path";

const rootDir = process.cwd();

const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

const esbuildProblemMatcherPlugin: esbuild.Plugin = {
  name: "esbuild-problem-matcher",
  setup(build: esbuild.PluginBuild) {
    build.onStart(() => console.log("[watch] build started"));
    build.onEnd((result: esbuild.BuildResult) => {
      result.errors.forEach((err) => {
        console.error(`✘ [ERROR] ${err.text}`);
        if (err.location) {
          console.error(
            `    ${err.location.file}:${err.location.line}:${err.location.column}:`
          );
        }
      });
      console.log("[watch] build finished");
    });
  },
};

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ["src/extension.ts"],
    bundle: true,
    format: "cjs",
    minify: production,
    sourcemap: !production,
    platform: "node",
    sourcesContent: false,
    outfile: "dist/extension.js",
    external: ["vscode"],
    logLevel: "silent",
    alias: {
      "@src": path.resolve(rootDir, "src"),
      "@tests": path.resolve(rootDir, "tests"),
    },
    plugins: [esbuildProblemMatcherPlugin],
  });

  if (watch) {
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
