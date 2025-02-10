module.exports = {
  "semi": true,                   // 强制在语句末尾使用分号
  "trailingComma": "es5",          // 允许对象/数组最后一项不加逗号（ES5 风格）
  "singleQuote": true,             // 使用单引号代替双引号
  "tabWidth": 2,                   // 每个 Tab 等于 2 个空格
  "printWidth": 80,                // 每行最大字符数为 80
  "endOfLine": "lf",               // 使用 LF 换行
  "no-multiple-empty-lines": [1, { "max": 1 }], // 限制空行数为 1
  "no-trailing-spaces": true,      // 删除行尾空格
  "arrowParens": "always",         // 箭头函数参数始终加括号
  "bracketSpacing": true,          // 在对象字面量的大括号之间加空格
  "jsxBracketSameLine": false,     // 多行 JSX 中，`>` 是否单独放一行
  "singleAttributePerLine": true   // 每个属性单独一行（用于 JSX）
};
