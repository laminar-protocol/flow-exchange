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
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint', 'import', 'react-hooks'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    '@typescript-eslint/indent': ['error', 2],
    indent: 'off', // required as 'off' by @typescript-eslint/indent
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.tsx'] }],
    'react/prop-types': [0],
    'react/jsx-props-no-spreading': [0],
    'max-len': ['error', { code: 150 }],
    'spaced-comment': [
      'error',
      'always',
      {
        markers: ['/'],
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'object-curly-newline': 'off',
    'lines-between-class-members': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-confusing-arrow': 'off',
    'no-restricted-syntax': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/prefer-regexp-exec': 'off', // maybe later?
    'no-console': 'off', // TODO: drop this and replace console.log with a logger
    'function-paren-newline': 'off', // fix conflicts with prittier
    'arrow-parens': ['error', 'as-needed'], // fix conflicts with prittier
    'no-shadow': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
      typescript: {
        directory: './tsconfig.json',
      },
    },
  },
};
