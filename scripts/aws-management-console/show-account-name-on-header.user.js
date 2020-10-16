// @ts-check

// ==UserScript==
// @name         Show account name on header
// @namespace    https://github.com/munierujp/
// @version      1.2.2
// @description  Show account name on header on AWS Management Console
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://munierujp.github.io/userscripts/scripts/aws-management-console/show-account-name-on-header.user.js
// @downloadURL  https://munierujp.github.io/userscripts/scripts/aws-management-console/show-account-name-on-header.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  /** @type {Record<string, string>} */
  const ACCOUNT_NAMES = {
    '264691882649': 'enet-dev',
    '273955500657': 'enet-staging',
    '006841978030': 'enet-prod'
  }

  /**
   * @param {Object} params
   * @param {() => string} params.accountNameGetter
   * @param {() => Element} params.labelElementGetter
   */
  const showAccountName = ({
    accountNameGetter,
    labelElementGetter
  }) => {
    const accountName = accountNameGetter()

    if (!accountName) {
      throw new Error('Failed to get account name.')
    }

    const labelElement = labelElementGetter()

    if (!labelElement) {
      throw new Error('Failed to get label element.')
    }

    labelElement.textContent = accountName
  }

  const showAccountNameByPatternA = () => {
    const accountNameGetter = () => {
      const accountNameElement = document.getElementById('awsc-login-display-name-account')

      if (!accountNameElement) {
        throw new Error('Failed to get account name element.')
      }

      return accountNameElement.textContent
    }
    const labelElementGetter = () => {
      const usernameMenuElement = document.getElementById('nav-usernameMenu')

      if (!usernameMenuElement) {
        throw new Error('Failed to get username menu element.')
      }

      return usernameMenuElement.querySelector('.nav-elt-label')
    }
    showAccountName({
      accountNameGetter,
      labelElementGetter
    })
  }

  const showAccountNameByPatternB = () => {
    const accountNameGetter = () => {
      const accountIdElement = document.querySelector('[data-testid="aws-my-account-details"]')

      if (!accountIdElement) {
        throw new Error('Failed to get account id element.')
      }

      const accountId = accountIdElement.textContent

      if (!accountId) {
        throw new Error('Failed to get account id from account id element.')
      }

      return ACCOUNT_NAMES[accountId]
    }
    const labelElementGetter = () => {
      const usernameMenuElement = document.getElementById('nav-usernameMenu')

      if (!usernameMenuElement) {
        throw new Error('Failed to get username menu element.')
      }

      return usernameMenuElement.querySelector('[data-testid="awsc-nav-account-menu-button"] > span:first-child')
    }
    showAccountName({
      accountNameGetter,
      labelElementGetter
    })
  }

  try {
    showAccountNameByPatternA()
  } catch (e) {
    console.warn(e)
    console.warn('Failed to show account name by pattern A.')

    try {
      showAccountNameByPatternB()
    } catch (e) {
      console.error(e)
      console.error('Failed to show account name by pattern B.')
    }
  }
})()
