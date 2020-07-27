module.exports = {
  env: {
    commonjs: true,
    es2020: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
  },
};
