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

// TODO: リスト表示に対応

(function () {
  'use strict'

  const CLASS_CURRENT = 'current'
  const CLASS_BUTTON_THUMBNAIL = 'pic'
  const CLASS_BUTTON_LIST = 'tx'
  const CURSOR_BUTTON_CURRENT = 'auto'
  const CURSOR_BUTTON_NOT_CURRENT = 'pointer'
  const STYLE_DISPLAY_ITEM_HIDDEN = 'none'
  const STYLE_DISPLAY_ITEM_SHOW = 'list-item'

  /** @typedef {'thumbnail' | 'list'} ViewStyle */

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
  const getMenuElement = (main) => {
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
  const getViewStyle = (menu) => {
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
   * @param {HTMLElement} main
   * @returns {HTMLLIElement[]}
   */
  const getItemElementsForThumbnailView = (main) => {
    const list = main.querySelector('#list')
    const items = Array.from(list.querySelectorAll('li'))
    return items
  }

  /**
   * @param {HTMLElement} main
   */
  const showAllItemsForThumbnailView = (main) => {
    const items = getItemElementsForThumbnailView(main)
    items.forEach(item => {
      item.style.display = STYLE_DISPLAY_ITEM_SHOW
    })
  }

  /**
   * @param {HTMLElement} main
   */
  const showDiscountedItemsForThumbnailView = (main) => {
    const items = getItemElementsForThumbnailView(main)
    items.forEach(item => {
      const discount = item.querySelector('.txtoff')
      const display = discount ? STYLE_DISPLAY_ITEM_SHOW : STYLE_DISPLAY_ITEM_HIDDEN
      item.style.display = display
    })
  }

  /**
   * @param {HTMLElement} main
   * @returns {HTMLUListElement}
   */
  const createButtonListElementForThumbnailView = (main) => {
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
      showAllItemsForThumbnailView(main)
    })

    showDiscountedButton.addEventListener('click', () => {
      if (isCurrentElement(showDiscountedButton)) {
        return
      }

      deactivateButton(showDiscountedButton)
      activateButton(showAllButton)
      showDiscountedItemsForThumbnailView(main)
    })

    return buttonList
  }

  /**
   * @param {HTMLElement} main
   * @returns {HTMLDivElement}
   */
  const createFilterMenuElementForThumbnailView = (main) => {
    const filterMenu = document.createElement('div')
    const label = document.createElement('span')
    label.textContent = '絞り込み'
    filterMenu.appendChild(label)

    const buttonList = createButtonListElementForThumbnailView(main)
    filterMenu.appendChild(buttonList)
    return filterMenu
  }

  const main = () => {
    console.debug('start')
    const main = getMainElement()
    const menu = getMenuElement(main)
    const viewStyle = getViewStyle(menu)
    console.debug(`viewStyle=${viewStyle}`)

    if (viewStyle === 'thumbnail') {
      const filterMenu = createFilterMenuElementForThumbnailView(main)
      menu.appendChild(filterMenu)
    }
  }

  main()
})()
