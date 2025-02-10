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

// 运行 ESLint 检查并捕获错误
const lintFiles = (files) => {
  try {
    // 不再使用 --ext 参数，而是依赖配置文件
    execSync(`eslint ${files.join(' ')}`, { stdio: 'inherit' });
    return true;  // ESLint 检查通过
  } catch (error) {
    // 捕获 ESLint 错误并显示详细信息
    console.error("ESLint check failed:\n");
    if (error.stdout) {
      console.error(error.stdout.toString());
    }
    if (error.stderr) {
      console.error(error.stderr.toString());
    }
    return false;  // ESLint 检查失败
  }
};

// 提交的文件和行数限制
const maxFiles = 10;
const maxLines = 500;

const changedFiles = getChangedFiles();
const changedLines = getChangedLines();

// 检查是否超过文件和行数限制
if (changedFiles.length > maxFiles) {
  console.error(`Error: You have modified more than ${maxFiles} files.`);
  process.exit(1); // 阻止提交
}

if (changedLines > maxLines) {
  console.error(`Error: You have modified more than ${maxLines} lines.`);
  process.exit(1); // 阻止提交
}

// 检查 ESLint 是否通过
const eslintPassed = lintFiles(changedFiles);
if (!eslintPassed) {
  process.exit(1); // 阻止提交
}

console.log(`Commit passed: ${changedFiles.length} files and ${changedLines} lines modified.`);