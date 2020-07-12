// ==UserScript==
// @name         Show account name on header on AWS Management Console
// @namespace    https://github.com/munierujp/
// @version      0.1.2
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

  const getAccountName = () => {
    const accountNameElement = document.getElementById('awsc-login-display-name-account')

    if (!accountNameElement) {
      return
    }

    const accountName = accountNameElement.textContent

    if (!accountName) {
      return
    }

    return accountName
  }

  const getUsernameMenuLabelElement = () => {
    const usernameMenuElement = document.getElementById('nav-usernameMenu')

    if (!usernameMenuElement) {
      return
    }

    return usernameMenuElement.querySelector('.nav-elt-label')
  }

  const usernameMenuLabelElement = getUsernameMenuLabelElement()

  if (!usernameMenuLabelElement) {
    console.warn('Failed to get label element.')
    return
  }

  const accountName = getAccountName()

  if (!accountName) {
    console.warn('Failed to get account name.')
    return
  }

  usernameMenuLabelElement.textContent = accountName
})()
