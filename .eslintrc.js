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
		],
		rules: {
			semi: "error",
			"prefer-const": "error",
			"no-trailing-spaces": "error",
			"no-multiple-empty-lines": ["error", { "max": 1 }],
			"prettier/prettier": "error", // 强制 Prettier 规则
			"prettier/prettier": [
				"error",
				{
					"semi": true,
					"trailingComma": "es5",
					"singleQuote": true,
					"tabWidth": 2,
					"printWidth": 80,
					"endOfLine": "lf",
					"no-multiple-empty-lines": [1, { "max": 1 }],
					"no-trailing-spaces": true,
				}
			]
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
