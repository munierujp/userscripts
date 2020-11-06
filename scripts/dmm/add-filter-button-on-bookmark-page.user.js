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

  const CLASS_ACTIVE_BUTTON = 'current'
  const CURSOR_BUTTON_ACTIVE = 'auto'
  const CURSOR_BUTTON_INACTIVE = 'pointer'

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
   * @param {HTMLElement[]} buttons
   */
  const toggleButton = (...buttons) => {
    buttons.forEach(button => button.classList.toggle(CLASS_ACTIVE_BUTTON))
    buttons.forEach(button => {
      const cursor = button.style.cursor === CURSOR_BUTTON_INACTIVE ? CURSOR_BUTTON_ACTIVE : CURSOR_BUTTON_INACTIVE
      button.style.cursor = cursor
    })
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
    const allButton = createButtonElement('すべて')
    allButton.classList.add(CLASS_ACTIVE_BUTTON)
    const discountedButton = createButtonElement('セール中')
    discountedButton.style.cursor = CURSOR_BUTTON_INACTIVE

    allButton.addEventListener('click', () => {
      if (allButton.classList.contains(CLASS_ACTIVE_BUTTON)) {
        return
      }

      toggleButton(allButton, discountedButton)
      showAllItems()
    })

    discountedButton.addEventListener('click', () => {
      if (discountedButton.classList.contains(CLASS_ACTIVE_BUTTON)) {
        return
      }

      toggleButton(discountedButton, allButton)
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
