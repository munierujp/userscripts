// @ts-check

/** @typedef {import('eslint').ESLint.ConfigData} ConfigData */

/**
 * @type {ConfigData}
 * @see https://eslint.org/docs/latest/use/configure/configuration-files
 */
const config = {
  extends: [
    'plugin:userscripts/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}

// eslint-disable-next-line unicorn/prefer-module
module.exports = config
