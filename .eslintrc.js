module.exports = {
  extends: [
    'standard-with-typescript',
    'plugin:eslint-comments/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  env: {
    browser: true
  }
}
