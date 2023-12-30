// ==UserScript==
// @name         自動更新
// @namespace    https://github.com/munierujp/
// @version      0.1.0
// @description  Yahoo!リアルタイム検索でタイムラインを自動更新します。
// @author       https://github.com/munierujp/
// @homepage     https://github.com/munierujp/userscripts/tree/master/src/yahoo-japan/realtime/autoreload
// @homepageURL  https://github.com/munierujp/userscripts/tree/master/src/yahoo-japan/realtime/autoreload
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/yahoo-japan/realtime/autoreload.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/yahoo-japan/realtime/autoreload.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        *://realtime.yahoo.co.jp/realtime/search?*
// @match        *://search.yahoo.co.jp/realtime/search?*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const isElement = (value) => {
        return value instanceof Element;
    };

    const checkboxElement = document.getElementById('autoscroll');
    if (checkboxElement === null) {
        throw new Error('Checkbox element is missing.');
    }
    const labelElement = document.querySelector('label[for="autoscroll"]');
    if (labelElement === null) {
        throw new Error('Label element is missing.');
    }
    const observer = new MutationObserver((mutations) => {
        const isOff = mutations
            .map(({ target }) => target)
            .filter(isElement)
            .some(({ classList }) => classList.contains('Tab_off__wzixv'));
        if (isOff) {
            checkboxElement.click();
        }
    });
    observer.observe(labelElement, {
        attributes: true,
        attributeFilter: ['class']
    });

})();
