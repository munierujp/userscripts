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
  const getMenuElement = () => {
    return document.querySelector('.d-rcol.selector')
  }

  /**
   * @param {HTMLElement} element
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
   * @returns {HTMLLIElement[]}
   */
  const getItemElementsForThumbnailView = () => {
    const list = document.getElementById('list')
    const items = Array.from(list.querySelectorAll('li'))
    return items
  }

  const showAllItemsForThumbnailView = () => {
    const items = getItemElementsForThumbnailView()
    items.forEach(item => {
      item.style.display = STYLE_DISPLAY_ITEM_SHOW
    })
  }

  const showDiscountedItemsForThumbnailView = () => {
    const items = getItemElementsForThumbnailView()
    items.forEach(item => {
      const discount = item.querySelector('.txtoff')
      const display = discount ? STYLE_DISPLAY_ITEM_SHOW : STYLE_DISPLAY_ITEM_HIDDEN
      item.style.display = display
    })
  }

  /**
   * @returns {HTMLUListElement}
   */
  const createButtonListElementForThumbnailView = () => {
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
      showAllItemsForThumbnailView()
    })

    showDiscountedButton.addEventListener('click', () => {
      if (isCurrentElement(showDiscountedButton)) {
        return
      }

      deactivateButton(showDiscountedButton)
      activateButton(showAllButton)
      showDiscountedItemsForThumbnailView()
    })

    return buttonList
  }

  /**
   * @returns {HTMLDivElement}
   */
  const createFilterMenuElementForThumbnailView = () => {
    const filterMenu = document.createElement('div')
    const label = document.createElement('span')
    label.textContent = '絞り込み'
    filterMenu.appendChild(label)

    const buttonList = createButtonListElementForThumbnailView()
    filterMenu.appendChild(buttonList)
    return filterMenu
  }

  const main = () => {
    console.debug('start')
    const menu = getMenuElement()
    const viewStyle = getViewStyle(menu)
    console.debug(`viewStyle=${viewStyle}`)

    if (viewStyle === 'thumbnail') {
      const filterMenu = createFilterMenuElementForThumbnailView()
      menu.appendChild(filterMenu)
    }
  }

  main()
})()
