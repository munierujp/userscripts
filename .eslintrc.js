// @ts-check

/** @typedef {import('eslint').ESLint.ConfigData} ConfigData */

/**
 * @type {ConfigData}
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 */
const config = {
  extends: [
    '@munierujp/eslint-config-typescript',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    // ユーザースクリプトでは使えないので無効化
    'unicorn/prefer-top-level-await': 'off'
  },
  ignorePatterns: [
    'dist/**/*.js'
  ]
}

// eslint-disable-next-line unicorn/prefer-module
module.exports = config
