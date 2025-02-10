import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { eslintPluginPrettierRecommended } from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts,vue}"] },
	{ files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	eslintPluginPrettierRecommended, // Prettier plugin for ESLint
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/essential"],
	{ files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
	{
		"extends": [
			"eslint:recommended",
			"plugin:vue/vue3-recommended",
			"plugin:prettier/recommended", // 启用 Prettier 推荐配置
			"plugin:@typescript-eslint/recommended",
		],
		rules: {
			semi: "error",
			"prefer-const": "error",
			"no-trailing-spaces": "error",
			"no-multiple-empty-lines": ["error", { "max": 1 }],
			"prettier/prettier": "error", // 强制 Prettier 规则
			"semi": "error", // 强制使用分号
			"quotes": ["error", "single"], // 强制使用单引号
			"no-unused-vars": "warn", // 警告未使用的变量
		},
		overrides: [
			{
				files: ["**/*.vue"],
				rules: {
					"no-trailing-spaces": "error", // 确保 Vue 文件也删除行尾空格
					"no-multiple-empty-lines": ["error", { "max": 1 }] // Vue 文件限制最大空行数为 1
				}
			}
		]
	}
];
