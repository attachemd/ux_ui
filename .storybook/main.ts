import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": ["@storybook/addon-docs", '@storybook/addon-themes', '@vueless/storybook-dark-mode'],
  // "addons": ["@storybook/addon-docs", '@storybook/addon-themes', 'storybook-dark-mode'],
  "framework": {
    "name": "@storybook/angular",
    "options": {}
  }
};
export default config;
