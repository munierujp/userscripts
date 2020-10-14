// ==UserScript==
// @name         Change header color
// @namespace    https://github.com/munierujp/
// @version      1.2.0
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
    let color

    switch (suffix) {
      case 'develop':
      case 'dev':
        color = '#0D47A1'
        break
      case 'staging':
      case 'stage':
      case 'stg':
        color = '#1B5E20'
        break
      case 'production':
      case 'prod':
      case 'prd':
        color = '#B71C1C'
        break
    }

    if (!color) {
      return
    }

    const styleElement = document.createElement('style')
    styleElement.type = 'text/css'
    styleElement.textContent = `
body #awsgnav #nav-menubar,
body #awsgnav #nav-menubar .nav-menu,
#nav-menu-right {
background-color: ${color};
}
`
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

    let color

    switch (accountId) {
      case '264691882649':
        color = '#0D47A1'
        break
      case '273955500657':
        color = '#1B5E20'
        break
      case '006841978030':
        color = '#B71C1C'
        break
    }

    if (!color) {
      return
    }

    const styleElement = document.createElement('style')
    styleElement.type = 'text/css'
    styleElement.textContent = `
[data-testid="awsc-nav-header-viewport-shelf-inner"] {
background-color: ${color};
}
`
    return styleElement
  }

  const styleElement = createStyleElementByPatternA() || createStyleElementByPatternB()

  if (!styleElement) {
    console.error('Failed to create style element')
    return
  }

  document.head.appendChild(styleElement)
})()
