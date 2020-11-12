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
  /** @typedef {() => void} ShowItemsFunction */
  /** @typedef {{ showAllItems: ShowItemsFunction, showDiscountedItems: ShowItemsFunction }} ShowItemsFunctions */
  /** @typedef {(main: HTMLElement) => ShowItemsFunctions} CreateShowItemsFunctionsFunction */

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
   * @returns {value is ShowType}
   */
  const isShowType = (value) => {
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
   * @param {ShowType} params.showType
   * @param {ShowItemsFunction} params.showAllItems
   * @param {ShowItemsFunction} params.showDiscountedItems
   * @returns {HTMLUListElement}
   */
  const createButtonListElement = ({
    showType,
    showAllItems,
    showDiscountedItems
  }) => {
    const buttonList = document.createElement('ul')
    const createAllButton = showType === 'all' ? createCurrentButtonElement : createNotCurrentButtonElement
    const allButton = createAllButton('すべて')
    buttonList.appendChild(allButton)
    const createDiscountedButton = showType === 'discounted' ? createCurrentButtonElement : createNotCurrentButtonElement
    const discountedButton = createDiscountedButton('セール中')
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
   * @param {ShowType} params.showType
   * @param {ShowItemsFunction} params.showAllItems
   * @param {ShowItemsFunction} params.showDiscountedItems
   */
  const createFilterMenuElement = ({
    showType,
    showAllItems,
    showDiscountedItems
  }) => {
    const filterMenu = document.createElement('div')
    const label = createMenuLabelElement('絞り込み')
    filterMenu.appendChild(label)
    const buttonList = createButtonListElement({
      showType,
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

  /**
   * @param {HTMLLIElement[]} items
   */
  const showDiscountedItemsOnTableView = (items) => {
    items.forEach(item => {
      const discount = item.querySelector('.txtoff')
      const show = !!discount
      const display = show ? 'list-item' : 'none'
      item.style.display = display
    })
  }

  /** @type {CreateShowItemsFunctionsFunction} */
  const createShowItemsFunctionsOnTableView = (main) => {
    const list = main.querySelector('#list')
    const items = Array.from(list.querySelectorAll('li'))
    const showAllItems = () => showAllItemsOnTableView(items)
    const showDiscountedItems = () => showDiscountedItemsOnTableView(items)
    return {
      showAllItems,
      showDiscountedItems
    }
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

  /** @type {CreateShowItemsFunctionsFunction} */
  const createShowItemsFunctionsOnListView = (main) => {
    const table = main.querySelector('table')
    const rows = findDataRowElements(table)
    const showAllItems = () => showAllItemsOnListView(rows)
    const showDiscountedItems = () => showDiscountedItemsOnListView(rows)
    return {
      showAllItems,
      showDiscountedItems
    }
  }

  /**
   * @param {ViewType} viewType
   * @returns {CreateShowItemsFunctionsFunction}
   */
  const getCreateShowItemsFunctions = (viewType) => {
    switch (viewType) {
      case 'table':
        return createShowItemsFunctionsOnTableView
      case 'list':
        return createShowItemsFunctionsOnListView
    }
  }

  const main = () => {
    console.debug('start')
    const params = new URLSearchParams(location.search)
    const view = params.get('view')

    if (!isViewType(view)) {
      throw new Error(`Invalid view. view=${view}`)
    }

    const main = getMainElement()
    const createShowItemsFunctions = getCreateShowItemsFunctions(view)
    const {
      showAllItems,
      showDiscountedItems
    } = createShowItemsFunctions(main)

    const show = params.get('show')
    const showType = isShowType(show) ? show : 'all'

    if (showType === 'discounted') {
      showDiscountedItems()
    }

    const filterMenu = createFilterMenuElement({
      showType,
      showAllItems,
      showDiscountedItems
    })
    const menu = findMenuElement(main)
    menu.appendChild(filterMenu)
  }

  main()
})()
