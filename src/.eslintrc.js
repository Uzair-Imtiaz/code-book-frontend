module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react', 'jsx-a11y'],
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'jsx-a11y/label-has-associated-control': 'off',
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'arrow-spacing': ['error', { before: true, after: true }],
    camelcase: ['error', { properties: 'always' }],
    strict: ['error', 'never'],
    'linebreak-style': ['error', 'unix'],
    curly: ['error', 'all'],
    'default-case': 'error',
    'react/jsx-props-no-multi-spaces': 'error',
    'react/self-closing-comp': 'error',
    'no-unused-vars': 'warn',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
