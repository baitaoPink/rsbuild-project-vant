import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pkg from "eslint-plugin-prettier";
const { eslintPluginPrettierRecommended } = pkg;

export default [
  { files: ["**/*.{js,mjs,cjs,ts,vue}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended, // 正确引入 Prettier 配置
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  {
    "extends": [
      "eslint:recommended",
      "plugin:vue/vue3-recommended",
      "plugin:prettier/recommended",
      "plugin:@typescript-eslint/recommended",
    ],
    rules: {
      semi: "error",
      "prefer-const": "error",
      "no-trailing-spaces": "error",
      "no-multiple-empty-lines": ["error", { "max": 1 }],
      "prettier/prettier": "error",
      "semi": "error",
      "quotes": ["error", "single"],
      "no-unused-vars": "warn",
    },
    overrides: [
      {
        files: ["**/*.vue"],
        rules: {
          "no-trailing-spaces": "error",
          "no-multiple-empty-lines": ["error", { "max": 1 }],
        }
      }
    ]
  }
];