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
  const CURSOR_ACTIVE = 'auto'
  const CURSOR_INACTIVE = 'pointer'

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
   * @param {HTMLElement} element
   */
  const toggleActiveClass = (element) => {
    element.classList.toggle(CLASS_ACTIVE_BUTTON)
  }

  /**
   * @param {HTMLElement} element
   */
  const toggleCursor = (element) => {
    const cursor = element.style.cursor === CURSOR_INACTIVE ? CURSOR_ACTIVE : CURSOR_INACTIVE
    element.style.cursor = cursor
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
    const buttonList = document.createElement('ul')

    const allButton = createButtonElement('すべて')
    allButton.classList.add(CLASS_ACTIVE_BUTTON)
    buttonList.appendChild(allButton)

    const discountedButton = createButtonElement('セール中')
    discountedButton.style.cursor = CURSOR_INACTIVE
    buttonList.appendChild(discountedButton)

    allButton.addEventListener('click', () => {
      if (allButton.classList.contains(CLASS_ACTIVE_BUTTON)) {
        return
      }

      toggleActiveClass(allButton)
      toggleActiveClass(discountedButton)
      toggleCursor(allButton)
      toggleCursor(discountedButton)
      showAllItems()
    })

    discountedButton.addEventListener('click', () => {
      if (discountedButton.classList.contains(CLASS_ACTIVE_BUTTON)) {
        return
      }

      toggleActiveClass(discountedButton)
      toggleActiveClass(allButton)
      toggleCursor(discountedButton)
      toggleCursor(allButton)
      showDiscountedItems()
    })

    return buttonList
  }

  /**
   * @returns {HTMLDivElement}
   */
  const createFilterMenuElement = () => {
    const filterMenu = document.createElement('div')

    const label = document.createElement('span')
    label.textContent = '絞り込み'
    filterMenu.appendChild(label)

    const buttonList = createButtonListElement()
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
