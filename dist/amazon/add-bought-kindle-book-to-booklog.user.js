// ==UserScript==
// @name        Kindle本の購入完了時にブクログに登録
// @namespace    https://github.com/munierujp/
// @version      0.2.0
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
(function () {
    'use strict';

    const Origin = {
        /** Amazon */
        AMAZON: 'https://www.amazon.co.jp',
        /** ブクログ */
        BOOKLOG: 'https://booklog.jp'
    };

    const EventType = {
        /** AmazonでKindle本を購入 */
        AMAZON_BOUGHT: 'amazon_bought',
        /** ブクログの準備が完了 */
        BOOKLOG_READY: 'booklog_ready'
    };

    const extractAsinOnAmazon = (url) => {
        return url.searchParams.get('asin');
    };

    const processAmazon = () => {
        const asin = extractAsinOnAmazon(new URL(location.href)) ?? undefined;
        if (asin === undefined) {
            throw new Error('ASIN is missing.');
        }
        const booklogWindow = window.open(`${Origin.BOOKLOG}/item/1/${asin}`, '_blank');
        if (booklogWindow === null) {
            throw new Error('Failed to open new window.');
        }
        window.addEventListener('message', ({ data, origin }) => {
            if (origin === Origin.BOOKLOG && data === EventType.BOOKLOG_READY) {
                booklogWindow.postMessage(EventType.AMAZON_BOUGHT, Origin.BOOKLOG);
            }
        });
    };

    const processBooklog = () => {
        window.opener.postMessage(EventType.BOOKLOG_READY, Origin.AMAZON);
        window.addEventListener('message', ({ data, origin }) => {
            if (origin === Origin.AMAZON && data === EventType.AMAZON_BOUGHT) {
                const addButton = document.querySelector('a.additem_button[data-status="4"]') ?? undefined;
                addButton?.click();
            }
        });
    };

    switch (location.origin) {
        case Origin.AMAZON:
            processAmazon();
            break;
        case Origin.BOOKLOG:
            processBooklog();
            break;
    }

})();
