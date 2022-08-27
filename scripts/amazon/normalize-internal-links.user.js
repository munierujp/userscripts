// @ts-check

// ==UserScript==
// @name        内部リンクを正規化
// @namespace    https://github.com/munierujp/
// @version      0.1.0
// @description   Amazonの内部リンクを正規化します。
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://github.com/munierujp/userscripts/raw/master/scripts/amazon/normalize-internal-links.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/scripts/amazon/normalize-internal-links.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://www.amazon.co.jp/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  /**
   * @param {string} path
   * @returns {string}
   */
  const normalizePath = (path) => {
    const matched = path.match(/^\/(([^/]+)\/)?dp\/([^?/]+)([?/].+)?/)

    if (!matched) {
      return path
    }

    const [, , , asin] = matched
    return `/dp/${asin}`
  }

  const main = () => {
    Array.from(document.getElementsByTagName('a'))
      .forEach(element => {
        const href = element.getAttribute('href')

        if (!href || !href.startsWith('/')) {
          return
        }

        const normalizedPath = normalizePath(href)

        if (normalizedPath !== href) {
          element.setAttribute('href', normalizedPath)
        }
      })
  }

  main()
})()
