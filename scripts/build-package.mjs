import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const componentsDistDir = path.join(rootDir, "packages", "components", "dist");
const tokensSrcDir = path.join(rootDir, "packages", "tokens", "src");

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

await cp(componentsDistDir, distDir, { recursive: true });
await cp(path.join(tokensSrcDir, "tokens.css"), path.join(distDir, "tokens.css"));

const rootTypesPath = path.join(distDir, "index.d.ts");
const rootTypes = await readFile(rootTypesPath, "utf8");

await writeFile(
  rootTypesPath,
  rootTypes.replace('import "@mi/tokens/tokens.css";', 'import "./tokens.css";'),
);

await cp(path.join(componentsDistDir, "components.css"), path.join(distDir, "style.css"));
