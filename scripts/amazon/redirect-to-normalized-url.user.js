// @ts-check

// ==UserScript==
// @name        正規化されたURLにリダイレクト
// @namespace    https://github.com/munierujp/
// @version      0.2.1
// @description   Amazonで正規化されたURLにリダイレクトします。
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/amazon/redirect-to-normalized-url.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/amazon/redirect-to-normalized-url.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://www.amazon.co.jp/*/dp/*
// @match        https://www.amazon.co.jp/dp/*
// @match        https://www.amazon.co.jp/gp/product/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  /**
   * @param {string} url
   * @returns {string | undefined}
   */
  const extractAsin = (url) => {
    const matched = url.match(/^https?:\/\/www\.amazon\.co\.jp\/(gp\/product|(([^/]+)\/)?dp)\/([^?/]+)([?/].+)?/)
    return matched?.[4]
  }

  const main = () => {
    const url = location.href
    const asin = extractAsin(url)

    if (asin === undefined) {
      return
    }

    const normalizedUrl = `https://www.amazon.co.jp/dp/${asin}`

    if (normalizedUrl !== url) {
      location.href = normalizedUrl
    }
  }

  main()
})()
