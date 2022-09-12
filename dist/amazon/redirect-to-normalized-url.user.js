// ==UserScript==
// @name        正規化されたURLにリダイレクト
// @namespace    https://github.com/munierujp/
// @version      0.3.0
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
    'use strict';

    const extractAsin = (url) => {
        return url.match(/^https?:\/\/www\.amazon\.co\.jp\/(gp\/product|(([^/]+)\/)?dp)\/([^/?]+)([/?].+)?/)?.[4];
    };

    const url = location.href;
    const asin = extractAsin(url);
    if (asin !== undefined) {
        const normalizedUrl = `https://www.amazon.co.jp/dp/${asin}`;
        if (normalizedUrl !== url) {
            location.href = normalizedUrl;
        }
    }

})();
