// @ts-check

/** @typedef {import('eslint').ESLint.ConfigData} ConfigData */

/**
 * @type {ConfigData}
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-deprecated
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
    'dist/**/*.js',
    'scripts/**/*.js'
  ],
  overrides: [
    // https://typescript-eslint.io/troubleshooting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file
    {
      files: ['./**/*.{js,cjs,mjs}'],
      extends: ['plugin:@typescript-eslint/disable-type-checked']
    }
  ]
}

module.exports = config
