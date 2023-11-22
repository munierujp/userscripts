// ==UserScript==
// @name         ブックマークページにフィルターボタンを追加
// @namespace    https://github.com/munierujp/
// @version      1.3.6
// @description  DMMブックスのブックマークページにフィルターボタンを追加します。
// @author       https://github.com/munierujp/
// @homepage     https://github.com/munierujp/userscripts/tree/master/src/dmm/books/add-filter-button-on-bookmark-page
// @homepageURL  https://github.com/munierujp/userscripts/tree/master/src/dmm/books/add-filter-button-on-bookmark-page
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/dmm/books/add-filter-button-on-bookmark-page.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/dmm/books/add-filter-button-on-bookmark-page.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        *://book.dmm.co.jp/bookmark/*
// @match        *://book.dmm.com/bookmark/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const ButtonLabel = {
        All: 'すべて',
        Discounted: 'セール中'
    };

    const createActiveButtonElement = (label) => {
        const link = document.createElement('span');
        link.style.paddingLeft = '8px';
        link.style.paddingRight = '8px';
        link.textContent = label;
        const button = document.createElement('li');
        button.classList.add('current');
        button.style.width = 'auto';
        button.append(link);
        return button;
    };

    const createInactiveButtonElement = ({ label, url }) => {
        const link = document.createElement('a');
        link.href = url.toString();
        link.style.paddingLeft = '8px';
        link.style.paddingRight = '8px';
        link.textContent = label;
        const button = document.createElement('li');
        button.style.width = 'auto';
        button.append(link);
        return button;
    };

    const createUrl = (filter) => {
        const url = new URL(location.href);
        url.searchParams.set('filter', filter);
        return url;
    };

    const Filter = {
        All: 'all',
        Discounted: 'discounted'
    };
    const values = Object.values(Filter);
    const isFilter = (value) => values.includes(value);

    const createAllButtonElement = (filter) => {
        switch (filter) {
            case Filter.All:
                return createActiveButtonElement(ButtonLabel.All);
            case Filter.Discounted:
                return createInactiveButtonElement({
                    label: ButtonLabel.All,
                    url: createUrl(Filter.All)
                });
        }
    };

    const createDiscountedButtonElement = (filter) => {
        switch (filter) {
            case Filter.All:
                return createInactiveButtonElement({
                    label: ButtonLabel.Discounted,
                    url: createUrl(Filter.Discounted)
                });
            case Filter.Discounted:
                return createActiveButtonElement(ButtonLabel.Discounted);
        }
    };

    const createButtonListElement = (filter) => {
        const allButtonElement = createAllButtonElement(filter);
        const discountedButtonElement = createDiscountedButtonElement(filter);
        const buttonList = document.createElement('ul');
        buttonList.append(allButtonElement);
        buttonList.append(discountedButtonElement);
        return buttonList;
    };

    const createFilterMenuElement = (filter) => {
        const label = document.createElement('span');
        label.textContent = '絞り込み';
        const buttonListElement = createButtonListElement(filter);
        const filterMenu = document.createElement('div');
        filterMenu.append(label);
        filterMenu.append(buttonListElement);
        return filterMenu;
    };

    class BookmarkElement {
        element;
        constructor(element) {
            this.element = element;
        }
        static find() {
            const element = document.getElementById('main-bmk');
            return element === null ? undefined : new BookmarkElement(element);
        }
        hideUndiscountedItems() {
            const listElement = this.element.querySelector('#list');
            if (listElement === null) {
                throw new Error('Missing list element.');
            }
            const itemElements = Array.from(listElement.querySelectorAll('li'));
            itemElements.forEach(itemElement => {
                const discountElement = itemElement.querySelector('.txtoff');
                const display = discountElement === null ? 'none' : 'list-item';
                itemElement.style.display = display;
            });
        }
        appendFilterMenu(filter) {
            const menuElement = this.element.querySelector('.d-rcol.selector');
            if (menuElement === null) {
                throw new Error('Missing menu element.');
            }
            const filterMenuElement = createFilterMenuElement(filter);
            menuElement.append(filterMenuElement);
        }
        appendFilterParamToMenuLinks(filter) {
            const linkElements = this.element.querySelectorAll('.d-rcol.selector a');
            linkElements.forEach(linkElement => {
                const href = linkElement.getAttribute('href');
                if (href === null) {
                    return;
                }
                if (!/^\?/.test(href)) {
                    return;
                }
                const params = new URLSearchParams(href);
                params.set('filter', filter);
                linkElement.setAttribute('href', `?${params.toString()}`);
            });
        }
    }

    const extractFilter = (url) => {
        const maybeFilter = url.searchParams.get('filter');
        return isFilter(maybeFilter) ? maybeFilter : undefined;
    };

    const bookmarkElement = BookmarkElement.find();
    if (bookmarkElement === undefined) {
        throw new Error('Missing bookmark element.');
    }
    const url = new URL(location.href);
    const filter = extractFilter(url) ?? Filter.All;
    if (filter === Filter.Discounted) {
        bookmarkElement.hideUndiscountedItems();
    }
    bookmarkElement.appendFilterMenu(filter);
    bookmarkElement.appendFilterParamToMenuLinks(filter);

})();
