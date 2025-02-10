const { execSync } = require("child_process");

// 获取待提交的更改文件
const getChangedFiles = () => {
  const result = execSync("git diff --cached --name-only").toString();
  return result.split("\n").filter((file) => file.trim() !== "");
};

// 获取待提交的更改行数
const getChangedLines = () => {
  const files = getChangedFiles();
  let totalLines = 0;
  files.forEach((file) => {
    const diffResult = execSync(`git diff --cached --numstat ${file}`).toString();
    const lines = diffResult
      .split("\n")
      .map((line) => line.split("\t")[0])
      .filter((line) => line)
      .reduce((acc, cur) => acc + parseInt(cur, 10), 0);
    totalLines += lines;
  });
  return totalLines;
};

// 获取 ESLint 错误和警告
const getESLintErrors = () => {
  try {
    const result = execSync("npx eslint --max-warnings=0").toString();
    return result;
  } catch (error) {
    return error.stdout.toString(); // 返回 ESLint 错误或警告输出
  }
};

// 检查是否符合限制
const maxFiles = 10;
const maxLines = 500;
const changedFiles = getChangedFiles();
const changedLines = getChangedLines();

// 文件数限制
if (changedFiles.length > maxFiles) {
  console.error(`Error: You have modified more than ${maxFiles} files.`);
  process.exit(1); // 阻止提交
}

// 行数限制
if (changedLines > maxLines) {
  console.error(`Error: You have modified more than ${maxLines} lines.`);
  process.exit(1); // 阻止提交
}

// 检查 ESLint 错误和警告
const eslintResult = getESLintErrors();
if (eslintResult.includes("error")) {
  console.error("ESLint errors detected, commit is blocked.");
  console.error(eslintResult);
  process.exit(1); // 阻止提交
}

console.log(`Commit passed: ${changedFiles.length} files and ${changedLines} lines modified.`);