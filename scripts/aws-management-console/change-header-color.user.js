// @ts-check

// ==UserScript==
// @name         Change header color
// @namespace    https://github.com/munierujp/
// @version      1.2.1
// @description  Change header color on AWS Management Console
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://munierujp.github.io/userscripts/scripts/aws-management-console/change-header-color.user.js
// @downloadURL  https://munierujp.github.io/userscripts/scripts/aws-management-console/change-header-color.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  /** @typedef {'develop' | 'staging' | 'production'} Env */

  /** @type {Record<string, Env>} */
  const ACCOUNTS = {
    '006841978030': 'production',
    '264691882649': 'develop',
    '273955500657': 'staging'
  }

  /** @type {Record<Env, string>} */
  const COLORS = {
    'develop': '#0D47A1',
    'staging': '#1B5E20',
    'production': '#B71C1C'
  }

  /**
  * @param {string} env
  * @returns {Env | undefined}
  */
  const normalizeEnv = (env) => {
    switch (env) {
      case 'develop':
      case 'dev':
        return 'develop'
      case 'staging':
      case 'stage':
      case 'stg':
        return 'staging'
      case 'production':
      case 'prod':
      case 'prd':
        return 'production'
    }
  }

  const createStyleElement = (css) => {
    const styleElement = document.createElement('style')
    styleElement.type = 'text/css'
    styleElement.textContent = css
    return styleElement
  }

  const createStyleElementByPatternA = () => {
    const accountNameElement = document.getElementById('awsc-login-display-name-account')

    if (!accountNameElement) {
      return
    }

    const accountName = accountNameElement.textContent

    if (!accountName) {
      return
    }

    const matched = accountName.match(/-([^-]+)$/)

    if (!matched) {
      return
    }

    const suffix = matched[1]
    const env = normalizeEnv(suffix)

    if (!env) {
      return
    }

    const color = COLORS[env]

    const styleElement = createStyleElement(`
body #awsgnav #nav-menubar,
body #awsgnav #nav-menubar .nav-menu,
#nav-menu-right {
  background-color: ${color};
}
`)
    return styleElement
  }

  const createStyleElementByPatternB = () => {
    const accountIdElement = document.querySelector('[data-testid="aws-my-account-details"]')

    if (!accountIdElement) {
      return
    }

    const accountId = accountIdElement.textContent

    if (!accountId) {
      return
    }

    const env = ACCOUNTS[accountId]

    if (!env) {
      return
    }

    const color = COLORS[env]

    const styleElement = createStyleElement(`
[data-testid="awsc-nav-header-viewport-shelf-inner"] {
  background-color: ${color};
}
`)
    return styleElement
  }

  const styleElement = createStyleElementByPatternA() || createStyleElementByPatternB()

  if (!styleElement) {
    console.error('Failed to create style element')
    return
  }

  document.head.appendChild(styleElement)
})()
