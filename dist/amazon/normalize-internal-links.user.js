// ==UserScript==
// @name         内部リンクを正規化
// @namespace    https://github.com/munierujp/
// @version      0.3.1
// @description  Amazonの内部リンクを正規化します。
// @author       https://github.com/munierujp/
// @homepage     https://github.com/munierujp/userscripts
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/amazon/normalize-internal-links.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/amazon/normalize-internal-links.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        *://www.amazon.co.jp/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const createPath = (asin) => {
        return `/dp/${asin}`;
    };

    const extractAsin = (path) => {
        return path.match(/^\/(gp\/product|(([^/]+)\/)?dp)\/([^/?]+)([/?].+)?/)?.[4];
    };

    Array.from(document.querySelectorAll('a[href^="/"]')).forEach(element => {
        const href = element.getAttribute('href');
        if (href === null) {
            return;
        }
        const asin = extractAsin(href);
        if (asin === undefined) {
            return;
        }
        const normalizedPath = createPath(asin);
        if (normalizedPath !== href) {
            element.setAttribute('href', normalizedPath);
        }
    });

})();
