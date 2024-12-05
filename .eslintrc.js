module.exports = {
  root: true, // 标记为根配置
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // 启用 Prettier 插件，放在最后以覆盖其他规则
  ],
  settings: {
    react: {
      version: 'detect', // 自动检测 React 版本
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        useTabs: false,
        tabWidth: 2,
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'all',
        semi: true,
      },
    ],
    // 这里可以定义全局规则，也可以覆盖到具体包
    'react/prop-types': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/no-unsafe-function-type': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-explicit-any': [
      'error',
      {
        fixToUnknown: true,
        ignoreRestArgs: true,
      },
    ],
    'react/react-in-jsx-scope': 'off', // React 17+ 不再需要引入 React
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
    },
  ],
};
