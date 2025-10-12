import * as esbuild from "esbuild";
import path from "path";
import fs from "fs";

const rootDir = process.cwd();
const production = process.argv.includes("--production");
const watch = process.argv.includes("--watch");

const aliasPlugin = {
  name: "alias-plugin",
  setup(build: esbuild.PluginBuild) {
    const aliases: Record<string, string> = {
      "@src": path.resolve(rootDir, "src"),
      "@tests": path.resolve(rootDir, "tests"),
    };

    build.onResolve({ filter: /^@src\/|^@tests\// }, (args) => {
      for (const [alias, targetPath] of Object.entries(aliases)) {
        if (args.path.startsWith(alias)) {
          const subPath = args.path.slice(alias.length);
          const absPath = path.join(targetPath, subPath);

          if (!path.extname(absPath)) {
            const tsFile = `${absPath}.ts`;
            const indexFile = path.join(absPath, "index.ts");
            if (fs.existsSync(tsFile)) return { path: tsFile };
            if (fs.existsSync(indexFile)) return { path: indexFile };
          }

          return { path: absPath };
        }
      }
      return null;
    });
  },
};

const esbuildProblemMatcherPlugin: esbuild.Plugin = {
  name: "esbuild-problem-matcher",
  setup(build: esbuild.PluginBuild) {
    build.onStart(() => console.log("[watch] build started"));
    build.onEnd((result: esbuild.BuildResult) => {
      if (result.errors.length) {
        console.error("✘ [ERROR] Build failed with errors:");
        for (const err of result.errors) {
          console.error(`→ ${err.text}`);
          if (err.location)
            console.error(
              `  ${err.location.file}:${err.location.line}:${err.location.column}`
            );
        }
      } else {
        console.log("[watch] build finished");
      }
    });
  },
};

async function main() {
  const ctx = await esbuild.context({
    entryPoints: ["src/extension.ts"],
    outfile: "dist/extension.js",
    bundle: true,
    format: "cjs",
    platform: "node",
    minify: production,
    sourcemap: !production,
    sourcesContent: false,
    external: ["vscode"],
    logLevel: "silent",
    plugins: [aliasPlugin, esbuildProblemMatcherPlugin],
  });

  if (watch) {
    console.log("Watching for changes...");
    await ctx.watch();
  } else {
    await ctx.rebuild();
    await ctx.dispose();
    console.log("Build complete.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
