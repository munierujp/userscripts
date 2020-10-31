// @ts-check

// ==UserScript==
// @name         Change header color
// @namespace    https://github.com/munierujp/
// @version      1.3.2
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
    264691882649: 'develop',
    273955500657: 'staging'
  }

  /** @type {Record<Env, string>} */
  const COLORS = {
    develop: '#0D47A1',
    staging: '#1B5E20',
    production: '#B71C1C'
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

  /**
   * @param {Object} params
   * @param {() => Env} params.envGetter
   * @param {(color: string) => string} params.cssCreator
   */
  const changeHeaderColor = ({
    envGetter,
    cssCreator
  }) => {
    const env = envGetter()

    if (!env) {
      throw new Error('Failed to get env.')
    }

    const color = COLORS[env]
    const css = cssCreator(color)
    const styleElement = document.createElement('style')
    styleElement.type = 'text/css'
    styleElement.textContent = css
    document.head.appendChild(styleElement)
  }

  const changeHeaderColorByPatternA = () => {
    const envGetter = () => {
      const accountNameElement = document.getElementById('awsc-login-display-name-account')

      if (!accountNameElement) {
        throw new Error('Failed to get account name element.')
      }

      const accountName = accountNameElement.textContent

      if (!accountName) {
        throw new Error('Failed to get account name from account name element.')
      }

      const matched = accountName.match(/-([^-]+)$/)

      if (!matched) {
        throw new Error('Failed to get env from account name.')
      }

      const suffix = matched[1]
      return normalizeEnv(suffix)
    }
    const cssCreator = (color) => `
body #awsgnav #nav-menubar,
body #awsgnav #nav-menubar .nav-menu,
#nav-menu-right {
  background-color: ${color};
}
`
    changeHeaderColor({
      envGetter,
      cssCreator
    })
  }

  const changeHeaderColorByPatternB = () => {
    const envGetter = () => {
      const accountIdElement = document.querySelector('[data-testid="aws-my-account-details"]')

      if (!accountIdElement) {
        throw new Error('Failed to get account id element.')
      }

      const accountId = accountIdElement.textContent

      if (!accountId) {
        throw new Error('Failed to get account id from account id element.')
      }

      return ACCOUNTS[accountId]
    }
    const cssCreator = (color) => `
#awsc-nav-header,
#console-nav-footer-inner {
  background-color: ${color};
}
`
    changeHeaderColor({
      envGetter,
      cssCreator
    })
  }

  try {
    changeHeaderColorByPatternA()
  } catch (e) {
    console.warn(e)
    console.warn('Failed to change header color by pattern A.')

    try {
      changeHeaderColorByPatternB()
    } catch (e) {
      console.error(e)
      console.error('Failed to change header color by pattern B.')
    }
  }
})()
