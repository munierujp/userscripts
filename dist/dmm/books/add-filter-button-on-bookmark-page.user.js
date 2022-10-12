// ==UserScript==
// @name         ブックマークページにフィルターボタンを追加
// @namespace    https://github.com/munierujp/
// @version      1.3.3
// @description  DMMブックスのブックマークページにフィルターボタンを追加します。
// @author       https://github.com/munierujp/
// @homepage     https://github.com/munierujp/userscripts
// @homepageURL  https://github.com/munierujp/userscripts
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
    Object.values(ButtonLabel);

    const createActiveButton = (label) => {
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

    const createInactiveButton = ({ label, url }) => {
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

    const createAllButton = (filter) => {
        switch (filter) {
            case Filter.All:
                return createActiveButton(ButtonLabel.All);
            case Filter.Discounted:
                return createInactiveButton({
                    label: ButtonLabel.All,
                    url: createUrl(Filter.All)
                });
        }
    };

    const createDiscountedButton = (filter) => {
        switch (filter) {
            case Filter.All:
                return createInactiveButton({
                    label: ButtonLabel.Discounted,
                    url: createUrl(Filter.Discounted)
                });
            case Filter.Discounted:
                return createActiveButton(ButtonLabel.Discounted);
        }
    };

    const createButtonList = (filter) => {
        const allButton = createAllButton(filter);
        const discountedButton = createDiscountedButton(filter);
        const buttonList = document.createElement('ul');
        buttonList.append(allButton);
        buttonList.append(discountedButton);
        return buttonList;
    };

    const createFilterMenu = (filterType) => {
        const label = document.createElement('span');
        label.textContent = '絞り込み';
        const buttonList = createButtonList(filterType);
        const filterMenu = document.createElement('div');
        filterMenu.append(label);
        filterMenu.append(buttonList);
        return filterMenu;
    };

    class Bookmark {
        constructor(element) {
            this.element = element;
        }
        static find() {
            const element = document.getElementById('main-bmk');
            return element !== null ? new Bookmark(element) : undefined;
        }
        hideNotDiscountedItems() {
            const list = this.element.querySelector('#list');
            if (list === null) {
                throw new Error('Missing list.');
            }
            Array.from(list.querySelectorAll('li')).forEach(item => {
                const discount = item.querySelector('.txtoff');
                const display = discount !== null ? 'list-item' : 'none';
                item.style.display = display;
            });
        }
        appendFilterMenu(filterType) {
            const menu = this.element.querySelector('.d-rcol.selector');
            if (menu === null) {
                throw new Error('Missing menu.');
            }
            const filterMenu = createFilterMenu(filterType);
            menu.append(filterMenu);
        }
        appendFilterParamToMenuLinks(filterType) {
            const links = this.element.querySelectorAll('.d-rcol.selector a');
            links.forEach(link => {
                const href = link.getAttribute('href');
                if (href === null) {
                    return;
                }
                if (!/^\?/.test(href)) {
                    return;
                }
                const params = new URLSearchParams(href);
                params.set('filter', filterType);
                link.setAttribute('href', `?${params.toString()}`);
            });
        }
    }

    const findFilter = () => {
        const params = new URLSearchParams(location.search);
        const maybeFilter = params.get('filter');
        return isFilter(maybeFilter) ? maybeFilter : undefined;
    };

    const bookmark = Bookmark.find();
    if (bookmark === undefined) {
        throw new Error('Missing bookmark.');
    }
    const filter = findFilter() ?? Filter.All;
    if (filter === Filter.Discounted) {
        bookmark.hideNotDiscountedItems();
    }
    bookmark.appendFilterMenu(filter);
    bookmark.appendFilterParamToMenuLinks(filter);

})();
