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
  /** @typedef {(main: HTMLElement) => ShowItemsFunction} CreateShowItemsFunctionFunction */

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
   * @param {ShowType} showType
   */
  const updateShowType = (showType) => {
    const params = new URLSearchParams(location.search)
    params.set('show', showType)
    location.search = params.toString()
  }

  /**
   * @param {Object} params
   * @param {ShowType} params.showType
   * @returns {HTMLUListElement}
   */
  const createButtonListElement = ({
    showType
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

      updateShowType('all')
    })

    discountedButton.addEventListener('click', () => {
      if (isCurrentElement(discountedButton)) {
        return
      }

      updateShowType('discounted')
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
   */
  const createFilterMenuElement = ({
    showType
  }) => {
    const filterMenu = document.createElement('div')
    const label = createMenuLabelElement('絞り込み')
    filterMenu.appendChild(label)
    const buttonList = createButtonListElement({
      showType
    })
    filterMenu.appendChild(buttonList)
    return filterMenu
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

  /** @type {CreateShowItemsFunctionFunction} */
  const createShowDiscountedItemsFunctionOnTableView = (main) => {
    const list = main.querySelector('#list')
    const items = Array.from(list.querySelectorAll('li'))
    return () => showDiscountedItemsOnTableView(items)
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

  /** @type {CreateShowItemsFunctionFunction} */
  const createShowDiscountedItemsFunctionsOnListView = (main) => {
    const table = main.querySelector('table')
    const rows = findDataRowElements(table)
    return () => {
      rows.forEach(row => {
        const price = row.querySelector('.price')
        const discount = price.querySelector('.tx-sp')
        const show = !!discount
        const display = show ? 'table-row' : 'none'
        row.style.display = display
      })
    }
  }

  /**
   * @param {ViewType} viewType
   * @returns {CreateShowItemsFunctionFunction}
   */
  const getCreateShowDiscountedItemsFunctions = (viewType) => {
    switch (viewType) {
      case 'table':
        return createShowDiscountedItemsFunctionOnTableView
      case 'list':
        return createShowDiscountedItemsFunctionsOnListView
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
    const createShowDiscountedItemsFunctions = getCreateShowDiscountedItemsFunctions(view)
    const showDiscountedItems = createShowDiscountedItemsFunctions(main)

    const show = params.get('show')
    const showType = isShowType(show) ? show : 'all'

    if (showType === 'discounted') {
      showDiscountedItems()
    }

    const filterMenu = createFilterMenuElement({
      showType
    })
    const menu = findMenuElement(main)
    menu.appendChild(filterMenu)
  }

  main()
})()
