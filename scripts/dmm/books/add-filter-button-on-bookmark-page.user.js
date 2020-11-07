// @ts-check

// ==UserScript==
// @name        Add filter button on bookmark page
// @namespace    https://github.com/munierujp/
// @version      1.0.7
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

  /** @typedef {'thumbnail' | 'list'} ViewStyle */
  /** @typedef {(params: { main: HTMLElement, menu: HTMLElement }) => void} AppendFilterMenuFunction */
  /** @typedef {() => void} ShowAllItemsFunction */
  /** @typedef {() => void} ShowDiscountedItemsFunction */

  const CLASS_CURRENT = 'current'
  const CLASS_BUTTON_THUMBNAIL = 'pic'
  const CLASS_BUTTON_LIST = 'tx'
  const CURSOR_BUTTON_CURRENT = 'auto'
  const CURSOR_BUTTON_NOT_CURRENT = 'pointer'

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
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  const isCurrentElement = (element) => {
    return element.classList.contains(CLASS_CURRENT)
  }

  /**
   * @param {HTMLElement} menu
   * @returns {ViewStyle}
   */
  const findViewStyle = (menu) => {
    const buttonList = menu.querySelector('.style')
    const buttons = Array.from(buttonList.querySelectorAll('li'))
    const currentButton = buttons.find(isCurrentElement)

    if (currentButton.classList.contains(CLASS_BUTTON_THUMBNAIL)) {
      return 'thumbnail'
    }

    if (currentButton.classList.contains(CLASS_BUTTON_LIST)) {
      return 'list'
    }

    throw new Error('Failed to get view style')
  }

  /**
   * @param {HTMLElement} main
   * @returns {HTMLLIElement[]}
   */
  const findThumbnailItemElements = (main) => {
    const list = main.querySelector('#list')
    const items = Array.from(list.querySelectorAll('li'))
    return items
  }

  /**
   * @param {HTMLElement} main
   * @returns {HTMLTableRowElement[]}
   */
  const findListItemElements = (main) => {
    const table = main.querySelector('table')
    const rows = Array.from(table.querySelectorAll('tr'))
    const items = rows.filter(row => row.querySelector('td'))
    return items
  }

  /**
   * @param {string} text
   * @returns {HTMLLIElement}
   */
  const createButtonElement = (text) => {
    const button = document.createElement('li')
    button.style.width = 'auto'

    const label = document.createElement('span')
    label.style['padding-left'] = '8px'
    label.style['padding-right'] = '8px'
    label.textContent = text

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
   * @param {HTMLElement} button
   */
  const activateButton = (button) => {
    button.classList.remove(CLASS_CURRENT)
    button.style.cursor = CURSOR_BUTTON_NOT_CURRENT
  }

  /**
   * @param {HTMLElement} button
   */
  const deactivateButton = (button) => {
    button.classList.add(CLASS_CURRENT)
    button.style.cursor = CURSOR_BUTTON_CURRENT
  }

  /**
   * @param {Object} params
   * @param {ShowAllItemsFunction} params.showAllItems
   * @param {ShowDiscountedItemsFunction} params.showDiscountedItems
   * @returns {HTMLUListElement}
   */
  const createButtonListElement = ({
    showAllItems,
    showDiscountedItems
  }) => {
    const buttonList = document.createElement('ul')
    const showAllButton = createCurrentButtonElement('すべて')
    buttonList.appendChild(showAllButton)
    const showDiscountedButton = createNotCurrentButtonElement('セール中')
    buttonList.appendChild(showDiscountedButton)

    showAllButton.addEventListener('click', () => {
      if (isCurrentElement(showAllButton)) {
        return
      }

      deactivateButton(showAllButton)
      activateButton(showDiscountedButton)
      showAllItems()
    })

    showDiscountedButton.addEventListener('click', () => {
      if (isCurrentElement(showDiscountedButton)) {
        return
      }

      deactivateButton(showDiscountedButton)
      activateButton(showAllButton)
      showDiscountedItems()
    })

    return buttonList
  }

  /**
   * @param {Object} params
   * @param {ShowAllItemsFunction} params.showAllItems
   * @param {ShowDiscountedItemsFunction} params.showDiscountedItems
   * @returns {HTMLDivElement}
   */
  const createFilterMenuElement = ({
    showAllItems,
    showDiscountedItems
  }) => {
    const filterMenu = document.createElement('div')
    const label = document.createElement('span')
    label.textContent = '絞り込み'
    filterMenu.appendChild(label)

    const buttonList = createButtonListElement({
      showAllItems,
      showDiscountedItems
    })

    filterMenu.appendChild(buttonList)
    return filterMenu
  }

  /** @type {AppendFilterMenuFunction} */
  const appendFilterMenuOnThumbnailView = ({
    main,
    menu
  }) => {
    const items = findThumbnailItemElements(main)

    /** @type {ShowAllItemsFunction} */
    const showAllItems = () => {
      items.forEach(item => {
        item.style.display = 'list-item'
      })
    }

    /** @type {ShowDiscountedItemsFunction} */
    const showDiscountedItems = () => {
      items.forEach(item => {
        const discount = item.querySelector('.txtoff')
        const display = discount ? 'list-item' : 'none'
        item.style.display = display
      })
    }

    const filterMenu = createFilterMenuElement({
      showAllItems,
      showDiscountedItems
    })
    menu.appendChild(filterMenu)
  }

  /** @type {AppendFilterMenuFunction} */
  const appendFilterMenuOnListView = ({
    main,
    menu
  }) => {
    const rows = findListItemElements(main)
    /** @type {ShowAllItemsFunction} */
    const showAllItems = () => {
      rows.forEach(row => {
        row.style.display = 'table-row'
      })
    }
    /** @type {ShowDiscountedItemsFunction} */
    const showDiscountedItems = () => {
      rows.forEach(row => {
        const price = row.querySelector('.price')
        const discount = price.querySelector('.tx-sp')
        const display = discount ? 'table-row' : 'none'
        row.style.display = display
      })
    }
    const filterMenu = createFilterMenuElement({
      showAllItems,
      showDiscountedItems
    })
    menu.appendChild(filterMenu)
  }

  /**
   * @param {ViewStyle} viewStyle
   * @returns {AppendFilterMenuFunction}
   */
  const getAppendFilterMenuFunction = (viewStyle) => {
    switch (viewStyle) {
      case 'thumbnail':
        return appendFilterMenuOnThumbnailView
      case 'list':
        return appendFilterMenuOnListView
    }
  }

  const main = () => {
    console.debug('start')
    const main = getMainElement()
    const menu = findMenuElement(main)
    const viewStyle = findViewStyle(menu)
    console.debug(`viewStyle=${viewStyle}`)
    const appendFilterMenu = getAppendFilterMenuFunction(viewStyle)
    appendFilterMenu({
      main,
      menu
    })
  }

  main()
})()
