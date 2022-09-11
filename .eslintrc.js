const importOrderRules = {
  'sort-imports': 'off',
  'import/order': ['error', {
    alphabetize: {
      order: 'asc',
      caseInsensitive: true
    }
  }]
}

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
    ...importOrderRules,
    'tsdoc/syntax': 'warn'
  }
}
