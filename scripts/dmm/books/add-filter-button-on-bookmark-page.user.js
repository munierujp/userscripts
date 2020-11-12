// @ts-check

// ==UserScript==
// @name        Add filter button on bookmark page
// @namespace    https://github.com/munierujp/
// @version      1.2.0
// @description   Add filter button on bookmark page on DMM Books
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://munierujp.github.io/userscripts/scripts/dmm/books/add-filter-button-on-bookmark-page.user.js
// @downloadURL  https://munierujp.github.io/userscriptsscripts/dmm/books/add-filter-button-on-bookmark-page.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://book.dmm.com/bookmark/*
// @match        https://book.dmm.co.jp/bookmark/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict'

  /** @typedef {'table' | 'list'} ViewType */
  /** @typedef {'all' | 'discounted'} FilterType */
  /** @typedef {(main: HTMLElement) => void} ItemsShower */

  const CLASS_CURRENT = 'current'
  const CURSOR_BUTTON_CURRENT = 'auto'
  const CURSOR_BUTTON_NOT_CURRENT = 'pointer'

  /**
   * @param {string} value
   * @returns {value is ViewType}
   */
  const isViewType = (value) => {
    switch (value) {
      case 'table':
        return true
      case 'list':
        return true
      default:
        return false
    }
  }

  /**
   * @param {string} value
   * @returns {value is FilterType}
   */
  const isFilterType = (value) => {
    switch (value) {
      case 'all':
        return true
      case 'discounted':
        return true
      default:
        return false
    }
  }

  /**
   * @returns {HTMLElement}
   */
  const getMainElement = () => {
    return document.getElementById('main-bmk')
  }

  /**
   * @param {HTMLElement} main
   * @returns {HTMLElement}
   */
  const findMenuElement = (main) => {
    return main.querySelector('.d-rcol.selector')
  }

  /**
   * @param {string} text
   * @returns {HTMLLIElement}
   */
  const createCurrentButtonElement = (text) => {
    const button = document.createElement('li')
    button.classList.add(CLASS_CURRENT)
    button.style.width = 'auto'
    button.style.cursor = CURSOR_BUTTON_CURRENT
    const label = document.createElement('span')
    label.style['padding-left'] = '8px'
    label.style['padding-right'] = '8px'
    label.textContent = text
    button.appendChild(label)
    return button
  }

  /**
   * @param {FilterType} filterType
   * @returns {URL}
   */
  const createUrl = (filterType) => {
    const params = new URLSearchParams(location.search)
    params.set('filter', filterType)
    const url = new URL(location.href)
    url.search = params.toString()
    return url
  }

  /**
   * @param {Object} params
   * @param {string} params.text
   * @param {FilterType} params.filterType
   * @returns {HTMLLIElement}
   */
  const createNotCurrentButtonElement = ({
    text,
    filterType
  }) => {
    const button = document.createElement('li')
    button.style.width = 'auto'
    button.style.cursor = CURSOR_BUTTON_NOT_CURRENT
    const label = document.createElement('a')
    const url = createUrl(filterType)
    label.href = url.toString()
    label.style['padding-left'] = '8px'
    label.style['padding-right'] = '8px'
    label.textContent = text
    button.appendChild(label)
    return button
  }

  // TODO: リファクタリング
  /**
   * @param {FilterType} filterType
   * @returns {HTMLUListElement}
   */
  const createButtonListElement = (filterType) => {
    const buttonList = document.createElement('ul')

    if (filterType === 'all') {
      const allButton = createCurrentButtonElement('すべて')
      buttonList.appendChild(allButton)
      const discountedButton = createNotCurrentButtonElement({
        text: 'セール中',
        filterType: 'discounted'
      })
      buttonList.appendChild(discountedButton)
    } else if (filterType === 'discounted') {
      const allButton = createNotCurrentButtonElement({
        text: 'すべて',
        filterType: 'all'
      })
      buttonList.appendChild(allButton)
      const discountedButton = createCurrentButtonElement('セール中')
      buttonList.appendChild(discountedButton)
    }

    return buttonList
  }

  /**
   * @param {FilterType} filterType
   * @returns {HTMLElement}
   */
  const createFilterMenuElement = (filterType) => {
    const filterMenu = document.createElement('div')
    const label = document.createElement('span')
    label.textContent = '絞り込み'
    filterMenu.appendChild(label)
    const buttonList = createButtonListElement(filterType)
    filterMenu.appendChild(buttonList)
    return filterMenu
  }

  /** @type {ItemsShower} */
  const showDiscountedItemsOnTableView = (main) => {
    const list = main.querySelector('#list')
    const items = Array.from(list.querySelectorAll('li'))
    items.forEach(item => {
      const discount = item.querySelector('.txtoff')
      const show = !!discount
      const display = show ? 'list-item' : 'none'
      item.style.display = display
    })
  }

  /** @type {ItemsShower} */
  const showDiscountedItemsOnListView = (main) => {
    const table = main.querySelector('table')
    const rows = Array.from(table.querySelectorAll('tr'))
    rows
      .filter(row => row.querySelector('td'))
      .forEach(row => {
        const price = row.querySelector('.price')
        const discount = price.querySelector('.tx-sp')
        const show = !!discount
        const display = show ? 'table-row' : 'none'
        row.style.display = display
      })
  }

  /**
   * @param {ViewType} viewType
   * @returns {ItemsShower}
   */
  const getDiscountedItemsShower = (viewType) => {
    switch (viewType) {
      case 'table':
        return showDiscountedItemsOnTableView
      case 'list':
        return showDiscountedItemsOnListView
    }
  }

  const main = () => {
    console.debug('start')
    const params = new URLSearchParams(location.search)
    const view = params.get('view')

    if (!isViewType(view)) {
      throw new Error(`Invalid view. view=${view}`)
    }

    const filter = params.get('filter')
    const filterType = isFilterType(filter) ? filter : 'all'

    const main = getMainElement()

    if (filterType === 'discounted') {
      const showDiscountedItems = getDiscountedItemsShower(view)
      showDiscountedItems(main)
    }

    const filterMenu = createFilterMenuElement(filterType)
    const menu = findMenuElement(main)
    menu.appendChild(filterMenu)
  }

  main()
})()
