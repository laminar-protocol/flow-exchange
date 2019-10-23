module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    project: [
      './tsconfig.json',
    ]
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'react-hooks',
  ],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    indent: 'off', // required as 'off' by @typescript-eslint/indent
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx', '.tsx'] }],
    'react/prop-types': [0],
    'react/jsx-props-no-spreading': [0],
    'max-len': ['error', { code: 150 }],
    'spaced-comment': ['error', 'always', {
      'markers': ['/'],
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off', // maybe later?
    'no-console': 'off', // TODO: drop this and replace console.log with a logger
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src']
      },
      typescript: {
        directory: './tsconfig.json'
      }
    }
  },
};
