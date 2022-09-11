module.exports = {
  extends: [
    'standard-with-typescript',
    'plugin:eslint-comments/recommended'
  ],
  plugins: [
    'tsdoc'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  env: {
    browser: true
  },
  rules: {
    'tsdoc/syntax': 'warn'
  }
}
