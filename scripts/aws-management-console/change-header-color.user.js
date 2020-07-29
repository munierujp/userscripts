// ==UserScript==
// @name         Change header color on AWS Management Console
// @namespace    https://github.com/munierujp/
// @version      1.0.0
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

  const toColor = (accountName) => {
    const matched = accountName.match(/-([^-]+)$/)

    if (!matched) {
      return
    }

    const suffix = matched[1]
    switch (suffix) {
      case 'develop':
      case 'dev':
        return '#0D47A1'
      case 'staging':
      case 'stage':
      case 'stg':
        return '#1B5E20'
      case 'production':
      case 'prod':
      case 'prd':
        return '#B71C1C'
    }
  }

  const createStyleElement = (color) => {
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

  const accountName = getAccountName()
  const color = toColor(accountName)

  if (!color) {
    return
  }

  const styleElement = createStyleElement(color)
  document.head.appendChild(styleElement)
})()
