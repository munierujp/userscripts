// ==UserScript==
// @name         Kindle本の購入完了時にブクログに登録
// @namespace    https://github.com/munierujp/
// @version      0.2.1
// @description  AmazonでKindle本の購入完了時にブクログに読書状況を積読として登録します。
// @author       https://github.com/munierujp/
// @homepage     https://github.com/munierujp/userscripts
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

    const EventType = {
        AmazonBought: 'amazon_bought',
        BooklogReady: 'booklog_ready'
    };

    const extractAsin = (url) => {
        return url.searchParams.get('asin') ?? undefined;
    };

    const Origin = {
        Amazon: 'https://www.amazon.co.jp',
        Booklog: 'https://booklog.jp'
    };

    const handleAmazon = () => {
        const asin = extractAsin(new URL(location.href));
        if (asin === undefined) {
            throw new Error('ASIN is missing.');
        }
        const booklogTab = window.open(`${Origin.Booklog}/item/1/${asin}`, '_blank');
        if (booklogTab === null) {
            throw new Error('Failed to open new tab.');
        }
        window.addEventListener('message', ({ data, origin }) => {
            if (origin === Origin.Booklog && data === EventType.BooklogReady) {
                booklogTab.postMessage(EventType.AmazonBought, Origin.Booklog);
            }
        });
    };

    const findAddButton = () => {
        return document.querySelector('a.additem_button[data-status="4"]') ?? undefined;
    };

    const handleBooklog = () => {
        const opener = window.opener;
        if (opener === null || document.referrer !== 'https://www.amazon.co.jp/') {
            return;
        }
        opener.postMessage(EventType.BooklogReady, Origin.Amazon);
        window.addEventListener('message', ({ data, origin }) => {
            if (origin === Origin.Amazon && data === EventType.AmazonBought) {
                const addButton = findAddButton();
                addButton?.click();
            }
        });
    };

    switch (location.origin) {
        case Origin.Amazon:
            handleAmazon();
            break;
        case Origin.Booklog:
            handleBooklog();
            break;
    }

})();
