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

    const createCurrentButton = (text) => {
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

    const createNotCurrentButtonElement = ({ text, url }) => {
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
        const params = new URLSearchParams(location.search);
        params.set('filter', filterType);
        const url = new URL(location.href);
        url.search = params.toString();
        return url;
    };

    const FilterType = {
        ALL: 'all',
        DISCOUNTED: 'discounted'
    };
    const values$1 = Object.values(FilterType);
    const isFilterType = (value) => values$1.includes(value);

    const TEXT$1 = 'すべて';
    const createAllButton = (filterType) => {
        switch (filterType) {
            case FilterType.ALL:
                return createCurrentButton(TEXT$1);
            case FilterType.DISCOUNTED:
                return createNotCurrentButtonElement({
                    text: TEXT$1,
                    url: createUrl(FilterType.ALL)
                });
        }
    };

    const TEXT = 'セール中';
    const createDiscountedButtonElement = (filterType) => {
        switch (filterType) {
            case FilterType.ALL:
                return createNotCurrentButtonElement({
                    text: TEXT,
                    url: createUrl(FilterType.DISCOUNTED)
                });
            case FilterType.DISCOUNTED:
                return createCurrentButton(TEXT);
        }
    };

    const createButtonList = (filterType) => {
        const allButton = createAllButton(filterType);
        const discountedButton = createDiscountedButtonElement(filterType);
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

    const findMenu = (main) => {
        return main.querySelector('.d-rcol.selector') ?? undefined;
    };

    const createFilterMenuAppender = (filterType) => {
        return (main) => {
            const menu = findMenu(main);
            if (menu === undefined) {
                throw new Error('Missing menu.');
            }
            const filterMenu = createFilterMenu(filterType);
            menu.append(filterMenu);
        };
    };

    const findMain = () => {
        return document.getElementById('main-bmk') ?? undefined;
    };

    const showDiscountedItemsOnListView = (main) => {
        const table = main.querySelector('table');
        if (table === null) {
            throw new Error('Missing table.');
        }
        const dataRows = Array.from(table.querySelectorAll('tr')).filter(row => row.querySelector('td'));
        dataRows.forEach(row => {
            const discount = row.querySelector('.price .tx-sp');
            const display = discount !== null ? 'table-row' : 'none';
            row.style.display = display;
        });
    };

    const showDiscountedItemsOnTableView = (main) => {
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
        LIST: 'list',
        TABLE: 'table'
    };
    const values = Object.values(ViewType);
    const isViewType = (value) => values.includes(value);

    const getDiscountedItemsShower = (view) => {
        switch (view) {
            case ViewType.TABLE:
                return showDiscountedItemsOnTableView;
            case ViewType.LIST:
                return showDiscountedItemsOnListView;
        }
    };

    const params = new URLSearchParams(location.search);
    const view = params.get('view');
    if (!isViewType(view)) {
        throw new Error(`Invalid view. view=${String(view)}`);
    }
    const filter = params.get('filter');
    const filterType = isFilterType(filter) ? filter : FilterType.ALL;
    const main = findMain();
    if (main === undefined) {
        throw new Error('Missing main.');
    }
    if (filterType === FilterType.DISCOUNTED) {
        const showDiscountedItems = getDiscountedItemsShower(view);
        showDiscountedItems(main);
    }
    const appendFilterMenu = createFilterMenuAppender(filterType);
    appendFilterMenu(main);

})();
