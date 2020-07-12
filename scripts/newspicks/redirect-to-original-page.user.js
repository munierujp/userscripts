// ==UserScript==
// @name         Redirect to original page on NewsPicks
// @namespace    https://github.com/munierujp/
// @version      1.0.0
// @description  Redirect to original page on NewsPicks
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://munierujp.github.io/userscripts/scripts/newspicks/redirect-to-original-page.user.js
// @downloadURL  https://munierujp.github.io/userscripts/scripts/newspicks/redirect-to-original-page.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://newspicks.com/news/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  const getOriginalUrl = () => {
    const readMoreElement = document.querySelector('.read-more')

    if (!readMoreElement) {
      return
    }

    return readMoreElement.href
  }

  const redirect = (url) => {
    location.href = url
  }

  const originalUrl = getOriginalUrl()

  if (!originalUrl) {
    console.warn('Failed to get original URL.')
    return
  }

  redirect(originalUrl)
})()
