// @ts-check

// ==UserScript==
// @name        Add filter button on bookmark page
// @namespace    https://github.com/munierujp/
// @version      1.1.1
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

// TODO: URLパラメーター対応（show=discountedなどの場合、デフォルトでセール中表示にする）

(function () {
  'use strict'

  /** @typedef {'table' | 'list'} ViewType */
  /** @typedef {'all' | 'discounted'} ShowType */
  /** @typedef {() => void} AppendFilterMenuFunction */
  /** @typedef {() => void} ShowItemsFunction */

  const CLASS_CURRENT = 'current'
  const CURSOR_BUTTON_CURRENT = 'auto'
  const CURSOR_BUTTON_NOT_CURRENT = 'pointer'

  /**
   * @returns {ViewType}
   */
  const getViewType = () => {
    const params = new URLSearchParams(location.search)
    const view = params.get('view')

    switch (view) {
      case 'table':
        return 'table'
      case 'list':
        return 'list'
      default:
        throw new Error('Failed to get view type.')
    }
  }

  /**
   * @returns {ShowType}
   */
  const getShowType = () => {
    const params = new URLSearchParams(location.search)
    const show = params.get('show')

    switch (show) {
      case 'all':
        return 'all'
      case 'discounted':
        return 'discounted'
      default:
        throw new Error('Failed to get show type.')
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
   * @returns {HTMLSpanElement}
   */
  const createButtonLabelElement = (text) => {
    const label = document.createElement('span')
    label.style['padding-left'] = '8px'
    label.style['padding-right'] = '8px'
    label.textContent = text
    return label
  }

  /**
   * @param {string} text
   * @returns {HTMLLIElement}
   */
  const createButtonElement = (text) => {
    const button = document.createElement('li')
    button.style.width = 'auto'
    const label = createButtonLabelElement(text)
    button.appendChild(label)
    return button
  }

  /**
   * @param {string} text
   * @returns {HTMLLIElement}
   */
  const createCurrentButtonElement = (text) => {
    const button = createButtonElement(text)
    button.classList.add(CLASS_CURRENT)
    button.style.cursor = CURSOR_BUTTON_CURRENT
    return button
  }

  /**
   * @param {string} text
   * @returns {HTMLLIElement}
   */
  const createNotCurrentButtonElement = (text) => {
    const button = createButtonElement(text)
    button.style.cursor = CURSOR_BUTTON_NOT_CURRENT
    return button
  }

  /**
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  const isCurrentElement = (element) => {
    return element.classList.contains(CLASS_CURRENT)
  }

  /**
   * @param {HTMLElement} button
   */
  const deactivateButton = (button) => {
    button.classList.add(CLASS_CURRENT)
    button.style.cursor = CURSOR_BUTTON_CURRENT
  }

  /**
   * @param {HTMLElement} button
   */
  const activateButton = (button) => {
    button.classList.remove(CLASS_CURRENT)
    button.style.cursor = CURSOR_BUTTON_NOT_CURRENT
  }

  /**
   * @param {Object} params
   * @param {ShowItemsFunction} params.showAllItems
   * @param {ShowItemsFunction} params.showDiscountedItems
   * @returns {HTMLUListElement}
   */
  const createButtonListElement = ({
    showAllItems,
    showDiscountedItems
  }) => {
    const buttonList = document.createElement('ul')
    const allButton = createCurrentButtonElement('すべて')
    buttonList.appendChild(allButton)
    const discountedButton = createNotCurrentButtonElement('セール中')
    buttonList.appendChild(discountedButton)

    allButton.addEventListener('click', () => {
      if (isCurrentElement(allButton)) {
        return
      }

      deactivateButton(allButton)
      activateButton(discountedButton)
      showAllItems()
    })

    discountedButton.addEventListener('click', () => {
      if (isCurrentElement(discountedButton)) {
        return
      }

      deactivateButton(discountedButton)
      activateButton(allButton)
      showDiscountedItems()
    })

    return buttonList
  }

  /**
   * @param {string} text
   * @returns {HTMLSpanElement}
   */
  const createMenuLabelElement = (text) => {
    const label = document.createElement('span')
    label.textContent = text
    return label
  }

  /**
   * @param {Object} params
   * @param {ShowItemsFunction} params.showAllItems
   * @param {ShowItemsFunction} params.showDiscountedItems
   */
  const createFilterMenuElement = ({
    showAllItems,
    showDiscountedItems
  }) => {
    const filterMenu = document.createElement('div')
    const label = createMenuLabelElement('絞り込み')
    filterMenu.appendChild(label)
    const buttonList = createButtonListElement({
      showAllItems,
      showDiscountedItems
    })
    filterMenu.appendChild(buttonList)
    return filterMenu
  }

  /**
   * @param {HTMLLIElement[]} items
   */
  const showAllItemsOnTableView = (items) => {
    items.forEach(item => {
      item.style.display = 'list-item'
    })
  }

  /** @type {AppendFilterMenuFunction} */
  const appendFilterMenuOnTableView = () => {
    const main = getMainElement()
    const list = main.querySelector('#list')
    const items = Array.from(list.querySelectorAll('li'))
    const showAllItems = () => showAllItemsOnTableView(items)
    const showDiscountedItems = () => {
      items.forEach(item => {
        const discount = item.querySelector('.txtoff')
        const show = !!discount
        const display = show ? 'list-item' : 'none'
        item.style.display = display
      })
    }
    const filterMenu = createFilterMenuElement({
      showAllItems,
      showDiscountedItems
    })
    const menu = findMenuElement(main)
    menu.appendChild(filterMenu)
  }

  /**
   * @param {HTMLTableRowElement} row
   * @returns {boolean}
   */
  const isDataRow = (row) => {
    return !!row.querySelector('td')
  }

  /**
   * @param {HTMLTableElement} table
   * @returns {HTMLTableRowElement[]}
   */
  const findDataRowElements = (table) => {
    const rows = Array.from(table.querySelectorAll('tr'))
    return rows.filter(isDataRow)
  }

  /**
   * @param {HTMLTableRowElement[]} rows
   */
  const showAllItemsOnListView = (rows) => {
    rows.forEach(row => {
      row.style.display = 'table-row'
    })
  }

  /**
   * @param {HTMLTableRowElement[]} rows
   */
  const showDiscountedItemsOnListView = (rows) => {
      rows.forEach(row => {
        const price = row.querySelector('.price')
        const discount = price.querySelector('.tx-sp')
        const show = !!discount
        const display = show ? 'table-row' : 'none'
        row.style.display = display
      })
    }

  /** @type {AppendFilterMenuFunction} */
  const appendFilterMenuOnListView = () => {
    const main = getMainElement()
    const table = main.querySelector('table')
    const rows = findDataRowElements(table)
    const showAllItems = () => showAllItemsOnListView(rows)
    const showDiscountedItems = () => showDiscountedItemsOnListView(rows)
    const filterMenu = createFilterMenuElement({
      showAllItems,
      showDiscountedItems
    })
    const menu = findMenuElement(main)
    menu.appendChild(filterMenu)
  }

  /**
   * @param {ViewType} viewType
   * @returns {AppendFilterMenuFunction}
   */
  const getAppendFilterMenuFunction = (viewType) => {
    switch (viewType) {
      case 'table':
        return appendFilterMenuOnTableView
      case 'list':
        return appendFilterMenuOnListView
    }
  }

  const main = () => {
    console.debug('start')
    const viewType = getViewType()
    console.debug(`viewType=${viewType}`)
    const appendFilterMenu = getAppendFilterMenuFunction(viewType)
    appendFilterMenu()
  }

  main()
})()
