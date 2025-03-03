module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
    browser: false,
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  rules: {
    '@typescript-eslint/no-var-requires': 0,
    'no-console': 0,
  },
};
