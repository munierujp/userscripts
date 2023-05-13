// ==UserScript==
// @name         利用規約に同意
// @namespace    https://github.com/munierujp/
// @version      0.1.1
// @description  TOHOシネマズでチケット購入時の利用規約に同意します。
// @author       https://github.com/munierujp/
// @homepage     https://github.com/munierujp/userscripts/tree/master/src/toho-cinemas/agrees-to-tos
// @homepageURL  https://github.com/munierujp/userscripts/tree/master/src/toho-cinemas/agrees-to-tos
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/toho-cinemas/agrees-to-tos.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/toho-cinemas/agrees-to-tos.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        *://hlo.tohotheater.jp/net/ticket/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const checkbox = document.getElementById('terms_check');
    if (checkbox !== null && !checkbox.checked) {
        checkbox.click();
    }

})();
