// ==UserScript==
// @name        サイト内リンクを現在のタブで開く
// @namespace    https://github.com/munierujp/
// @version      0.2.0
// @description   Amazonでサイト内リンクを現在のタブで開きます。
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/amazon/open-internal-links-in-current-tab.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/amazon/open-internal-links-in-current-tab.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        *://www.amazon.co.jp/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    const findInternalLinks = () => {
        return Array.from(document.querySelectorAll('a[href^="/"]'));
    };

    findInternalLinks()
        .filter(element => element.getAttribute('target') === '_blank')
        .forEach(element => element.removeAttribute('target'));

})();
