// ==UserScript==
// @name         古い記事のアラートを改善
// @namespace    https://github.com/munierujp/
// @version      0.1.0
// @description  Qiitaの古い記事のアラートにおいて、年数をより正確に表示します。
// @author       https://github.com/munierujp/
// @homepage     https://github.com/munierujp/userscripts
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/qiita/improve-old-article-alert.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/qiita/improve-old-article-alert.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        *://qiita.com/*/items/*
// @require      https://cdn.jsdelivr.net/npm/dayjs@1.11.5/dayjs.min.js
// @grant        none
// ==/UserScript==

(function (dayjs) {
    'use strict';

    const differenceInYears = (date1, date2) => {
        return dayjs(date1).diff(date2, 'year');
    };

    const isAlertTextElement = (node) => {
        const { textContent } = node;
        return textContent !== null && /^この記事は最終更新日から\d+年以上が経過しています。$/.test(textContent);
    };

    const findAlertTextElement = () => {
        return Array.from(document.getElementsByTagName('p')).find(element => isAlertTextElement(element));
    };

    const findJsonLds = () => {
        return Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
            .map(({ textContent }) => textContent)
            .filter((json) => json !== null);
    };

    const isArticle = (value) => {
        return typeof value === 'object' && value !== null && value['@type'] === 'Article' && typeof value.dateModified === 'string';
    };

    const findArticle = () => {
        const jsonLds = findJsonLds();
        return jsonLds
            .map(json => JSON.parse(json))
            .find(isArticle);
    };

    const updateAlert = () => {
        const alertTextElement = findAlertTextElement();
        if (alertTextElement === undefined) {
            return;
        }
        const article = findArticle();
        if (article === undefined) {
            throw new Error('Missing article.');
        }
        const { dateModified } = article;
        if (dateModified === undefined) {
            throw new Error('Missing dateModified.');
        }
        const now = new Date();
        const year = differenceInYears(now, dateModified);
        alertTextElement.textContent = `この記事は最終更新日から${year}年以上が経過しています。`;
    };

    updateAlert();

})(dayjs);
