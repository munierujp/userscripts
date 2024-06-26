// @ts-check

/** @typedef {import('eslint').ESLint.ConfigData} ConfigData */

/**
 * @type {ConfigData}
 * @see https://eslint.org/docs/latest/use/configure/configuration-files-deprecated
 */
const config = {
  extends: [
    'plugin:userscripts/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  }
}

module.exports = config
