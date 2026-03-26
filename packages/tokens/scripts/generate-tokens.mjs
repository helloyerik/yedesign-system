import fs from "node:fs";
import path from "node:path";

const studioDir = path.resolve("packages/tokens/studio");
const outFile = path.resolve("packages/tokens/src/tokens.css");

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(studioDir, relativePath), "utf8"));

const palette = readJson("Palette/Mode 1.json");
const lightTokens = readJson("Tokens/Light.json");
const darkTokens = readJson("Tokens/Dark.json");
const spacings = readJson("Spacings/Mode 1.json");
const radius = readJson("Border Radius/Mode 1.json");
const appFontFamily = '"Onest", sans-serif';

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/ radius$/g, "")
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const getByPath = (source, tokenPath) =>
  tokenPath.split(".").reduce((acc, key) => {
    if (acc == null || !(key in acc)) {
      throw new Error(`Missing token path: ${tokenPath}`);
    }

    return acc[key];
  }, source);

const resolveValue = (value, source) => {
  if (typeof value === "string") {
    const match = value.match(/^\{(.+)\}$/);
    if (match) {
      return resolveValue(getByPath(source, match[1]).value, source);
    }

    return value;
  }

  if (typeof value === "object" && value !== null) {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, resolveValue(nested, source)]));
  }

  return value;
};

const walkColorTokens = (source, resolverSource, pathParts = []) => {
  const vars = [];

  for (const [key, value] of Object.entries(source)) {
    if (value && typeof value === "object" && value.type === "color") {
      vars.push([`--mi-color-${pathParts.concat(key).map(slug).join("-")}`, resolveValue(value.value, resolverSource)]);
      continue;
    }

    if (value && typeof value === "object") {
      vars.push(...walkColorTokens(value, resolverSource, pathParts.concat(key)));
    }
  }

  return vars;
};

const walkTypographyTokens = () => {
  const vars = [];
  const groups = ["Display", "Header", "Text"];

  for (const group of groups) {
    for (const [name, token] of Object.entries(palette[group] || {})) {
      if (token?.type !== "typography") {
        continue;
      }

      const resolved = {
        fontFamily: appFontFamily,
        fontWeight: resolveValue(token.value.fontWeight, palette),
        fontSize: resolveValue(token.value.fontSize, palette),
        lineHeight: resolveValue(token.value.lineHeight, palette),
      };
      const tokenName = slug(name);
      const fontWeight =
        group === "Display" || group === "Header"
          ? "600"
          : resolved.fontWeight.toLowerCase() === "regular"
            ? "400"
            : resolved.fontWeight.toLowerCase();
      vars.push([`--mi-font-family-${tokenName}`, resolved.fontFamily]);
      vars.push([`--mi-font-size-${tokenName}`, `${resolved.fontSize}px`]);
      vars.push([`--mi-line-height-${tokenName}`, `${resolved.lineHeight}px`]);
      vars.push([`--mi-font-weight-${tokenName}`, fontWeight]);
    }
  }

  return vars;
};

const spacingVars = Object.entries(spacings).map(([name, token]) => [`--mi-spacing-${slug(name)}`, `${token.value}px`]);
const radiusVars = Object.entries(radius).map(([name, token]) => [`--mi-radius-${slug(name)}`, `${token.value}px`]);
const lightColorVars = walkColorTokens(lightTokens, { ...palette, ...lightTokens });
const darkColorVars = walkColorTokens(darkTokens, { ...palette, ...darkTokens });
const typographyVars = walkTypographyTokens();

const aliasVars = [
  ["--mi-color-text-brand", "var(--mi-color-brand-text-brand)"],
  ["--mi-color-text-inverse", "var(--mi-color-brand-text-brand-contrast)"],
  ["--mi-color-base-background", "var(--mi-color-brand-base-background)"],
  ["--mi-color-base-brand", "var(--mi-color-brand-base-brand)"],
  ["--mi-color-base-brand-hover", "var(--mi-color-brand-base-brand-hover)"],
  ["--mi-color-surface-muted", "var(--mi-color-base-generic)"],
  ["--mi-color-surface-panel", "var(--mi-color-base-light)"],
  ["--mi-color-line-brand", "var(--mi-color-brand-line-brand)"],
  ["--mi-color-line-focus", "var(--mi-color-line-generic-active)"],
  ["--mi-color-status-info", "var(--mi-color-text-info)"],
  ["--mi-color-status-success", "var(--mi-color-text-positive)"],
  ["--mi-color-status-warning", "var(--mi-color-text-warning)"],
  ["--mi-color-status-danger", "var(--mi-color-text-danger)"],
  ["--mi-font-family-sans", "var(--mi-font-family-body-2)"],
  ['--mi-font-family-mono', '"Roboto Mono", monospace'],
  ["--mi-radius-pill", "999px"],
  ["--mi-spacing-2", "var(--mi-spacing-nano)"],
  ["--mi-spacing-4", "var(--mi-spacing-micro)"],
  ["--mi-spacing-8", "var(--mi-spacing-s)"],
  ["--mi-spacing-12", "var(--mi-spacing-m)"],
  ["--mi-spacing-16", "var(--mi-spacing-l)"],
  ["--mi-spacing-24", "var(--mi-spacing-2xl)"],
  ["--mi-spacing-32", "var(--mi-spacing-4xl)"],
  ["--mi-shadow-card", "0 18px 40px rgb(0 0 0 / 0.12)"],
  ["--mi-shadow-soft", "0 8px 24px rgb(0 0 0 / 0.08)"],
];

const validateNoAliasConflicts = (baseVars, aliases) => {
  const baseNames = new Set(baseVars.map(([name]) => name));
  const aliasNames = new Set();

  for (const [name, value] of aliases) {
    if (baseNames.has(name)) {
      throw new Error(`Alias token conflicts with generated token: ${name}`);
    }

    if (aliasNames.has(name)) {
      throw new Error(`Duplicate alias token: ${name}`);
    }

    if (value.includes(`var(${name})`)) {
      throw new Error(`Alias token cannot reference itself: ${name}`);
    }

    aliasNames.add(name);
  }
};

validateNoAliasConflicts(
  [...lightColorVars, ...typographyVars, ...spacingVars, ...radiusVars],
  aliasVars,
);

const cssBlock = (selector, vars) => {
  const lines = vars.map(([name, value]) => `  ${name}: ${value};`);
  return `${selector} {\n${lines.join("\n")}\n}`;
};

const css = [
  "/* Generated from packages/tokens/studio (Tokens Studio export). */",
  "",
  cssBlock(":root", [
    ...lightColorVars,
    ...typographyVars,
    ...spacingVars,
    ...radiusVars,
    ...aliasVars,
  ]),
  "",
  cssBlock("[data-theme=\"dark\"]", darkColorVars),
  "",
].join("\n");

fs.writeFileSync(outFile, css);
console.log(`Generated ${path.relative(process.cwd(), outFile)}`);
