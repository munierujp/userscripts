// @ts-check

// ==UserScript==
// @name        Kindle本の購入完了時にブクログに登録
// @namespace    https://github.com/munierujp/
// @version      0.1.2
// @description   AmazonでKindle本の購入完了時にブクログに読書状況を積読として登録します。
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/amazon/add-bought-kindle-book-to-booklog.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/amazon/add-bought-kindle-book-to-booklog.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://www.amazon.co.jp/kindle-dbs/thankYouPage?*
// @match        https://booklog.jp/item/1/*
// @grant        none
// ==/UserScript==

(() => {
  'use strict'

  /** AmazonでKindle本を購入したイベント */
  const EVENT_AMAZON_BOUGHT = 'amazon_bought'
  /** ブクログの準備が完了したイベント */
  const EVENT_BOOKLOG_READY = 'booklog_ready'
  /** Amazonのオリジン */
  const ORIGIN_AMAZON = 'https://www.amazon.co.jp'
  /** ブクログのオリジン */
  const ORIGIN_BOOKLOG = 'https://booklog.jp'

  /**
   * @param {URL} url
   * @returns {string | undefined}
   */
  const extractAsinOnAmazon = (url) => {
    return url.searchParams.get('asin') ?? undefined
  }

  const processAmazon = () => {
    const asin = extractAsinOnAmazon(new URL(location.href))

    if (asin === undefined) {
      throw new Error('ASIN is missing.')
    }

    const booklogWindow = window.open(`${ORIGIN_BOOKLOG}/item/1/${asin}`, '_blank') ?? undefined

    if (booklogWindow === undefined) {
      throw new Error('Failed to open new window.')
    }

    window.addEventListener('message', ({ data, origin }) => {
      if (origin === ORIGIN_BOOKLOG && data === EVENT_BOOKLOG_READY) {
        booklogWindow.postMessage(EVENT_AMAZON_BOUGHT, ORIGIN_BOOKLOG)
      }
    })
  }

  const processBooklog = () => {
    window.opener.postMessage(EVENT_BOOKLOG_READY, ORIGIN_AMAZON)
    window.addEventListener('message', ({ data, origin }) => {
      if (origin === ORIGIN_AMAZON && data === EVENT_AMAZON_BOUGHT) {
        /** @type {HTMLAnchorElement | null} */
        const addButton = document.querySelector('a.additem_button[data-status="4"]')
        addButton?.click()
      }
    })
  }

  const main = () => {
    switch (location.origin) {
      case ORIGIN_AMAZON:
        processAmazon()
        break
      case ORIGIN_BOOKLOG:
        processBooklog()
        break
    }
  }

  main()
})()
