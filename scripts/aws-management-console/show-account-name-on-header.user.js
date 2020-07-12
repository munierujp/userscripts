// ==UserScript==
// @name         Show account name on header on AWS Management Console
// @namespace    https://github.com/munierujp/
// @version      0.1.0
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

  const usernameMenuElement = document.getElementById('nav-usernameMenu')

  if (!usernameMenuElement) {
    return
  }

  const usernameMenuLabelElement = usernameMenuElement.querySelector('.nav-elt-label')

  if (!usernameMenuLabelElement) {
    return
  }

  const accountNameElement = document.getElementById('awsc-login-display-name-account')

  if (!accountNameElement) {
    return
  }

  const accountName = accountNameElement.textContent

  if (!accountName) {
    return
  }

  usernameMenuLabelElement.textContent = accountName
})()
