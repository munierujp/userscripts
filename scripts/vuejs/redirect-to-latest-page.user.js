// @ts-check

// ==UserScript==
// @name         Redirect to latest page
// @namespace    https://github.com/munierujp/
// @version      1.1.2
// @description   Redirect to latest page on Vue.js document
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://munierujp.github.io/userscripts/scripts/vuejs/redirect-to-latest-page.user.js
// @downloadURL  https://munierujp.github.io/userscripts/scripts/vuejs/redirect-to-latest-page.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://011.vuejs.org/*
// @match        https://012.vuejs.org/*
// @match        https://012-cn.vuejs.org/*
// @match        https://012-jp.vuejs.org/*
// @match        https://v1.vuejs.org/*
// @match        https://v1-cn.vuejs.org/*
// @match        https://v1-jp.vuejs.org/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  /** @typedef {'vuejs.org' | 'cn.vuejs.org' | 'jp.vuejs.org'} Host */

  /** @type {Record<string, Host>} */
  const HOSTS = {
    '011.vuejs.org': 'vuejs.org',
    '012-cn.vuejs.org': 'cn.vuejs.org',
    '012-jp.vuejs.org': 'jp.vuejs.org',
    '012.vuejs.org': 'vuejs.org',
    'v1-cn.vuejs.org': 'cn.vuejs.org',
    'v1-jp.vuejs.org': 'jp.vuejs.org',
    'v1.vuejs.org': 'vuejs.org'
  }

  const main = () => {
    const host = HOSTS[location.host]

    if (host) {
      location.host = host
    }
  }

  main()
})()
