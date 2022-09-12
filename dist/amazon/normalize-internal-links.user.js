// ==UserScript==
// @name        内部リンクを正規化
// @namespace    https://github.com/munierujp/
// @version      0.3.0
// @description   Amazonの内部リンクを正規化します。
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/amazon/normalize-internal-links.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/amazon/normalize-internal-links.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://www.amazon.co.jp/*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    const extractAsin = (path) => {
        return path.match(/^\/(gp\/product|(([^/]+)\/)?dp)\/([^/?]+)([/?].+)?/)?.[4];
    };

    Array.from(document.getElementsByTagName('a'))
        .forEach(element => {
        const href = element.getAttribute('href') ?? undefined;
        if (href === undefined || !href.startsWith('/')) {
            return;
        }
        const asin = extractAsin(href);
        if (asin === undefined) {
            return;
        }
        const normalizedPath = `/dp/${asin}`;
        if (normalizedPath !== href) {
            element.setAttribute('href', normalizedPath);
        }
    });

})();
