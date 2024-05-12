// @ts-check

/** @typedef {import('eslint').ESLint.ConfigData} ConfigData */

/**
 * @type {ConfigData}
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 */
const config = {
  extends: [
    '@munierujp/eslint-config-typescript'
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
  ],
  overrides: [
    // https://typescript-eslint.io/troubleshooting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file
    {
      files: ['./**/*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked']
    }
  ]
}

// eslint-disable-next-line unicorn/prefer-module
module.exports = config
