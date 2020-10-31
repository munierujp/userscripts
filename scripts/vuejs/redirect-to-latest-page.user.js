// ==UserScript==
// @name         Redirect to latest page
// @namespace    https://github.com/munierujp/
// @version      1.1.0
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

  const toLatestHost = (oldHost) => {
    switch (oldHost) {
      case '011.vuejs.org':
      case '012.vuejs.org':
      case 'v1.vuejs.org':
        return 'vuejs.org'
      case '012-cn.vuejs.org':
      case 'v1-cn.vuejs.org':
        return 'cn.vuejs.org'
      case '012-jp.vuejs.org':
      case 'v1-jp.vuejs.org':
        return 'jp.vuejs.org'
    }
  }

  location.host = toLatestHost(location.host)
})()
