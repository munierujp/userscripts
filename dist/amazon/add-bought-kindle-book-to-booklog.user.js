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
// @match        *://booklog.jp/item/1/*
// @match        *://www.amazon.co.jp/kindle-dbs/thankYouPage?*
// @grant        none
// ==/UserScript==
(function () {
    'use strict';

    const Origin = {
        AMAZON: 'https://www.amazon.co.jp',
        BOOKLOG: 'https://booklog.jp'
    };

    const EventType = {
        AMAZON_BOUGHT: 'amazon_bought',
        BOOKLOG_READY: 'booklog_ready'
    };

    const extractAsin = (url) => {
        return url.searchParams.get('asin') ?? undefined;
    };

    const processAmazon = () => {
        const asin = extractAsin(new URL(location.href));
        if (asin === undefined) {
            throw new Error('ASIN is missing.');
        }
        const booklogTab = window.open(`${Origin.BOOKLOG}/item/1/${asin}`, '_blank');
        if (booklogTab === null) {
            throw new Error('Failed to open new tab.');
        }
        window.addEventListener('message', ({ data, origin }) => {
            if (origin === Origin.BOOKLOG && data === EventType.BOOKLOG_READY) {
                booklogTab.postMessage(EventType.AMAZON_BOUGHT, Origin.BOOKLOG);
            }
        });
    };

    const findAddButton = () => {
        return document.querySelector('a.additem_button[data-status="4"]') ?? undefined;
    };

    const processBooklog = () => {
        window.opener.postMessage(EventType.BOOKLOG_READY, Origin.AMAZON);
        window.addEventListener('message', ({ data, origin }) => {
            if (origin === Origin.AMAZON && data === EventType.AMAZON_BOUGHT) {
                const addButton = findAddButton();
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
