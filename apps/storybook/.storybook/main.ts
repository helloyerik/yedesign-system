import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/vue3-vite";
import vue from "@vitejs/plugin-vue";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/stories/**/*.mdx", "../src/stories/**/*.stories.@(ts|tsx)"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  async viteFinal(config) {
    config.plugins = [...(config.plugins || []), vue()];
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@tokens": path.resolve(rootDir, "../../../packages/tokens/src"),
      "@tokens-studio": path.resolve(rootDir, "../../../packages/tokens/studio"),
      "@components": path.resolve(rootDir, "../../../packages/components/src"),
      "@storybook-app": path.resolve(rootDir, "../src"),
    };

    return config;
  },
};

export default config;
