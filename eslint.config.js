import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pkg from "eslint-plugin-prettier";
const { eslintPluginPrettierRecommended } = pkg;

export default [
  // 基本配置应用于所有文件
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest", // 最新的 ECMAScript 版本
        sourceType: "module",  // 使用模块化
      },
      globals: globals.browser, // 浏览器环境的全局变量
    },
    extends: [
      "eslint:recommended", // ESLint 推荐规则
      "plugin:vue/vue3-recommended", // Vue 3 推荐配置
      "plugin:prettier/recommended", // Prettier 配置
      "plugin:@typescript-eslint/recommended", // TypeScript 推荐配置
    ],
    plugins: ["vue", "@typescript-eslint", "prettier"],
    rules: {
      semi: "error", // 强制使用分号
      "prefer-const": "error", // 强制使用 const
      "no-trailing-spaces": "error", // 禁止行尾空格
      "no-multiple-empty-lines": ["error", { max: 1 }], // 禁止多个空行
      "prettier/prettier": "error", // 强制遵循 Prettier 规则
      quotes: ["error", "single"], // 强制使用单引号
      "no-unused-vars": "warn", // 警告未使用的变量
    },
    overrides: [
      {
        files: ["**/*.vue"],
        parserOptions: {
          parser: tseslint.parser, // 使用 TypeScript 解析器处理 Vue 文件
        },
        rules: {
          "no-trailing-spaces": "error", // Vue 文件中的行尾空格检查
          "no-multiple-empty-lines": ["error", { max: 1 }], // Vue 文件中的空行检查
        },
      },
    ],
  },

  // 对纯 JavaScript 文件的额外配置
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" }, // 对 JavaScript 文件启用 CommonJS 模块
  },

  // 插件和配置的推荐使用
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended, // 使用 Prettier 插件的推荐配置
  ...tseslint.configs.recommended, // TypeScript 的 ESLint 配置
  ...pluginVue.configs["flat/essential"], // Vue 的基本 ESLint 配置
];