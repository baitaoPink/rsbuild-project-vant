import { defineConfig } from '@rsbuild/core';

import { pluginVue } from '@rsbuild/plugin-vue';
// import { pluginSass } from '@rsbuild/plugin-sass'
import AutoImport from 'unplugin-auto-import/rspack';
import Components from 'unplugin-vue-components/rspack';
import { VantResolver } from '@vant/auto-import-resolver';
// import { pluginEslint } from "@rsbuild/plugin-eslint";
export default defineConfig({
  performance: {
    removeConsole: true, // 生产环境移除console
  },
  source: {
    alias: {
      '@': './src',
    },
  },

  plugins: [pluginVue()],
  tools: {
    rspack: {
      plugins: [
        AutoImport({
          imports: ['vue'], // Auto import Vue's API (ref, reactive, etc.)
          resolvers: [VantResolver()],
        }),
        // Components plugin with VantResolver for on-demand component import
        Components({
          resolvers: [VantResolver()],
        }),
      ],
    },
  },
});
