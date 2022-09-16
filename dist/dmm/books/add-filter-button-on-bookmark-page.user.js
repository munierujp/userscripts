// ==UserScript==
// @name        ブックマークページにフィルターボタンを追加
// @namespace    https://github.com/munierujp/
// @version      1.3.0
// @description   DMMブックスのブックマークページにフィルターボタンを追加します。
// @author       https://github.com/munierujp/
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

    const createActiveButton = (text) => {
        const label = document.createElement('span');
        label.style.paddingLeft = '8px';
        label.style.paddingRight = '8px';
        label.textContent = text;
        const button = document.createElement('li');
        button.classList.add('current');
        button.style.width = 'auto';
        button.append(label);
        return button;
    };

    const createInactiveButton = ({ text, url }) => {
        const label = document.createElement('a');
        label.href = url.toString();
        label.style.paddingLeft = '8px';
        label.style.paddingRight = '8px';
        label.textContent = text;
        const button = document.createElement('li');
        button.style.width = 'auto';
        button.append(label);
        return button;
    };

    const createUrl = (filterType) => {
        const url = new URL(location.href);
        url.searchParams.set('filter', filterType);
        return url;
    };

    const FilterType = {
        All: 'all',
        Discounted: 'discounted'
    };
    const values$1 = Object.values(FilterType);
    const isFilterType = (value) => values$1.includes(value);

    const TEXT$1 = 'すべて';
    const createAllButton = (filterType) => {
        switch (filterType) {
            case FilterType.All:
                return createActiveButton(TEXT$1);
            case FilterType.Discounted:
                return createInactiveButton({
                    text: TEXT$1,
                    url: createUrl(FilterType.All)
                });
        }
    };

    const TEXT = 'セール中';
    const createDiscountedButton = (filterType) => {
        switch (filterType) {
            case FilterType.All:
                return createInactiveButton({
                    text: TEXT,
                    url: createUrl(FilterType.Discounted)
                });
            case FilterType.Discounted:
                return createActiveButton(TEXT);
        }
    };

    const createButtonList = (filterType) => {
        const allButton = createAllButton(filterType);
        const discountedButton = createDiscountedButton(filterType);
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

    const findMain = () => {
        return document.getElementById('main-bmk') ?? undefined;
    };

    const showDiscountedItems = (main) => {
        const list = main.querySelector('#list');
        if (list === null) {
            throw new Error('Missing list.');
        }
        const items = Array.from(list.querySelectorAll('li'));
        items.forEach(item => {
            const discount = item.querySelector('.txtoff');
            const display = discount !== null ? 'list-item' : 'none';
            item.style.display = display;
        });
    };

    const ViewType = {
        Table: 'table'
    };
    const values = Object.values(ViewType);
    const isViewType = (value) => values.includes(value);

    const params = new URLSearchParams(location.search);
    const view = params.get('view');
    if (!isViewType(view)) {
        throw new Error('Invalid view.');
    }
    const main = findMain();
    if (main === undefined) {
        throw new Error('Missing main.');
    }
    const menu = main.querySelector('.d-rcol.selector');
    if (menu === null) {
        throw new Error('Missing menu.');
    }
    const filter = params.get('filter');
    const filterType = isFilterType(filter) ? filter : FilterType.All;
    if (filterType === FilterType.Discounted) {
        showDiscountedItems(main);
    }
    const filterMenu = createFilterMenu(filterType);
    menu.append(filterMenu);

})();
