// @ts-check

// ==UserScript==
// @name        Add filter button on bookmark page
// @namespace    https://github.com/munierujp/
// @version      1.0.1
// @description   Add filter button on bookmark page on DMM Books
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://munierujp.github.io/userscripts/scripts/dmm/add-filter-button-on-bookmark-page.user.js
// @downloadURL  https://munierujp.github.io/userscriptsscripts/dmm/add-filter-button-on-bookmark-page.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://book.dmm.com/bookmark/*
// @match        https://book.dmm.co.jp/bookmark/*
// @grant        none
// ==/UserScript==

// TODO: リスト表示に対応

(function () {
  'use strict'

  const CLASS_BUTTON_INACTIVE = 'current'
  const CURSOR_BUTTON_ACTIVE = 'pointer'
  const CURSOR_BUTTON_INACTIVE = 'auto'

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
   * @returns {HTMLLIElement}
   */
  const createAllButtonElement = () => {
    const button = createButtonElement('すべて')
    button.classList.add(CLASS_BUTTON_INACTIVE)
    button.style.cursor = CURSOR_BUTTON_INACTIVE
    return button
  }

  /**
   * @param {HTMLElement} button
   */
  const activateButton = (button) => {
    button.classList.remove(CLASS_BUTTON_INACTIVE)
    button.style.cursor = CURSOR_BUTTON_ACTIVE
  }

  /**
   * @param {HTMLElement} button
   */
  const deactivateButton = (button) => {
    button.classList.add(CLASS_BUTTON_INACTIVE)
    button.style.cursor = CURSOR_BUTTON_INACTIVE
  }

  /**
   * @returns {HTMLLIElement[]}
   */
  const getItemElements = () => {
    const list = document.getElementById('list')
    const items = Array.from(list.querySelectorAll('li'))
    return items
  }

  const showAllItems = () => {
    const items = getItemElements()
    items.forEach(item => {
      item.style.display = 'list-item'
    })
  }

  /**
   * @param {HTMLLIElement} item
   * @returns {boolean}
   */
  const isDiscountedItem = (item) => {
    return !!item.querySelector('.txtoff')
  }

  const showDiscountedItems = () => {
    const items = getItemElements()
    items.forEach(item => {
      const display = isDiscountedItem(item) ? 'list-item' : 'none'
      item.style.display = display
    })
  }

  /**
   * @returns {HTMLUListElement}
   */
  const createButtonListElement = () => {
    const allButton = createAllButtonElement()
    const discountedButton = createButtonElement('セール中')
    discountedButton.style.cursor = CURSOR_BUTTON_ACTIVE

    allButton.addEventListener('click', () => {
      if (allButton.classList.contains(CLASS_BUTTON_INACTIVE)) {
        return
      }

      deactivateButton(allButton)
      activateButton(discountedButton)
      showAllItems()
    })

    discountedButton.addEventListener('click', () => {
      if (discountedButton.classList.contains(CLASS_BUTTON_INACTIVE)) {
        return
      }

      deactivateButton(discountedButton)
      activateButton(allButton)
      showDiscountedItems()
    })

    const buttonList = document.createElement('ul')
    buttonList.appendChild(allButton)
    buttonList.appendChild(discountedButton)
    return buttonList
  }

  /**
   * @returns {HTMLDivElement}
   */
  const createFilterMenuElement = () => {
    const label = document.createElement('span')
    label.textContent = '絞り込み'
    const buttonList = createButtonListElement()
    const filterMenu = document.createElement('div')
    filterMenu.appendChild(label)
    filterMenu.appendChild(buttonList)
    return filterMenu
  }

  const main = () => {
    console.debug('start')
    const menu = document.querySelector('.d-rcol.selector')
    const filterMenu = createFilterMenuElement()
    menu.appendChild(filterMenu)
  }

  main()
})()
