// @ts-check

// ==UserScript==
// @name        正規化されたURLにリダイレクト
// @namespace    https://github.com/munierujp/
// @version      0.1.0
// @description   Amazonで正規化されたURLにリダイレクトします。
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://www.amazon.co.jp/dp/*
// @match        https://www.amazon.co.jp/*/dp/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  /**
   * @param {string} url
   * @returns {string}
   */
  const normalizeUrl = (url) => {
    const matched = url.match(/^https?:\/\/www\.amazon\.co\.jp\/(([^/]+)\/)?dp\/([^?/]+)([?/].+)?/)

    if (matched === null) {
      throw new Error(`Invalid URL. url=${url}`)
    }

    const [, , , asin] = matched
    return `https://www.amazon.co.jp/dp/${asin}`
  }

  const main = () => {
    const url = location.href
    const normalizedUrl = normalizeUrl(url)

    if (url !== normalizedUrl) {
      location.href = normalizedUrl
    }
  }

  main()
})()
