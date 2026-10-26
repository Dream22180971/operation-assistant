// Vite React + TypeScript 模板的 ESLint 8 配置，与 package.json 里的 devDependencies 对应
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'node_modules', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    // 读流式响应用 while (true) + break 是标准写法；ESLint 9 起默认也不再报这种循环
    'no-constant-condition': ['error', { checkLoops: false }],
  },
};
