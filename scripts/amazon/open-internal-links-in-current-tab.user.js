// @ts-check

// ==UserScript==
// @name        サイト内リンクを現在のタブで開く
// @namespace    https://github.com/munierujp/
// @version      0.1.0
// @description   Amazonでサイト内リンクを現在のタブで開きます。
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://github.com/munierujp/userscripts/raw/master/scripts/amazon/open-internal-links-in-current-tab.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/scripts/amazon/open-internal-links-in-current-tab.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://www.amazon.co.jp/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  /**
   * @param {HTMLAnchorElement} element
   * @returns {boolean}
   */
  const isInternalLink = (element) => {
    const href = element.getAttribute('href')
    return href !== null && href.startsWith('/')
  }

  const main = () => {
    Array.from(document.getElementsByTagName('a'))
      .filter(element => isInternalLink(element))
      .filter(element => {
        const target = element.getAttribute('target')
        return target && target === '_blank'
      })
      .forEach(element => element.removeAttribute('target'))
  }

  main()
})()
