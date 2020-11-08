// @ts-check

// ==UserScript==
// @name         Play video with VLC
// @namespace    https://github.com/munierujp/
// @version      0.1.12
// @description  Play video with VLC on Video Station of DiskStation
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://munierujp.github.io/userscripts/scripts/disk-station/video-station/play-video-with-vlc.user.js
// @downloadURL  https://munierujp.github.io/userscripts/scripts/disk-station/video-station/play-video-with-vlc.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        *://diskstation.local/*
// @grant        none
// ==/UserScript==

/*
* ## Requirements
* - `diskstation.local` is assigned to DiskStation Manager by hosts file
* - URL Scheme for VLC (`vlc://<file-path>`) is available
* - DiskStation's video directory is mounted on local disk
*/

// TODO: サムネイル上の小さい再生ボタンも書き換える

(function () {
  'use strict'

  const APP_ID = 'SYNO.SDS.VideoStation.AppInstance'
  const URL_SCHEME = 'vlc'
  const ROOT_DIR = '/Volumes'
  const SELECTOR_DROPDOWN_MENU = '.syno-ux-menu.syno-vs2-dropdown-menu'
  const SELECTOR_VIDEO_INFO_DIALOG = '.video-info-dialog'
  const ID_DROPDOWN_MENU_STYLE = 'jp-munieru-style-dropdown-menu'
  const ID_VIDEO_INFO_DIALOG_STYLE = 'jp-munieru-style-video-info-dialog'

  /** @typedef {(records: MutationRecord[]) => HTMLElement} HTMLElementFinder */

  /**
   * @returns {boolean}
   */
  const isVideoStationPage = () => {
    const params = new URLSearchParams(location.search)
    const appId = params.get('launchApp')
    return appId === APP_ID
  }

  /**
   * @param {string} id
   * @returns {HTMLStyleElement}
   */
  const createStyleElement = (id) => {
    const style = document.createElement('style')
    style.id = id
    style.type = 'text/css'
    return style
  }

  /**
   * @param {string} id
   */
  const appendStyleElement = (id) => {
    const style = createStyleElement(id)
    document.head.appendChild(style)
  }

  const appendStyleElements = () => {
    appendStyleElement(ID_DROPDOWN_MENU_STYLE)
    appendStyleElement(ID_VIDEO_INFO_DIALOG_STYLE)
  }

  /**
   * @param {MutationRecord} record
   * @returns {Node[]}
   */
  const toAddedNodes = (record) => {
    return record.addedNodes ? Array.from(record.addedNodes) : []
  }

  /**
   * @param {MutationRecord} record
   * @returns {HTMLElement[]}
   */
  const toAddedHTMLElements = (record) => {
    const addedNodes = toAddedNodes(record)
    /** @type {HTMLElement[]} */
    // @ts-expect-error
    const addedElements = addedNodes.filter(node => node instanceof HTMLElement)
    return addedElements
  }

  /**
   * @param {(element: HTMLElement) => boolean} filter
   * @returns {HTMLElementFinder}
   */
  const createHTMLElementFinder = (filter) => {
    return records => {
      return records
        .map(toAddedHTMLElements)
        .reduce((a, b) => a.concat(b), [])
        .find(filter)
    }
  }

  /**
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  const isPlayButtonElement = (element) => {
    const { classList } = element
    return classList.contains('x-btn') && classList.contains('play')
  }

  const findPlayButtonElement = createHTMLElementFinder(element => {
    return isPlayButtonElement(element)
  })

  /**
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  const isVideoInfoDialogElement = (element) => {
    return element.classList.contains('video-info-dialog')
  }

  const findVideoInfoDialogElement = createHTMLElementFinder(element => {
    return isVideoInfoDialogElement(element)
  })

  /**
   * @template {Node} T
   * @param {T} node
   * @returns {T}
   */
  const deepCloneNode = (node) => {
    /** @type {T} */
    // @ts-expect-error
    const clonedNode = node.cloneNode(true)
    return clonedNode
  }

  /**
   * @param {HTMLElement} dialog
   * @returns {string}
   */
  const findFilePath = (dialog) => {
    return Array.from(dialog.querySelectorAll('tr'))
      .map(row => Array.from(row.querySelectorAll('td')))
      .filter(({ length }) => length >= 2)
      .map(cells => cells.map(({ textContent }) => textContent))
      .map(([label, value]) => ({
        label,
        value
      }))
      .filter(({ label }) => label === 'ファイルのパス')
      .map(({ value }) => value)
      .find(filePath => filePath)
  }

  /**
   * @param {HTMLElement} dialog
   * @returns {HTMLButtonElement}
   */
  const findCloseButtonElement = (dialog) => {
    return dialog.querySelector('button[aria-label="閉じる"]')
  }

  /**
   * @param {HTMLElement} dialog
   */
  const closeVideoInfoDialog = (dialog) => {
    const closeButton = findCloseButtonElement(dialog)
    closeButton.click()
  }

  /**
   * @returns {HTMLStyleElement}
   */
  const getVideoInfoDialogStyleElement = () => {
    /** @type {HTMLStyleElement} */
    // @ts-expect-error
    const style = document.getElementById(ID_VIDEO_INFO_DIALOG_STYLE)
    return style
  }

  /**
   * @param {HTMLStyleElement} menuStyle
   */
  const hideVideoInfoDialog = (menuStyle) => {
    menuStyle.textContent = `
${SELECTOR_VIDEO_INFO_DIALOG} {
  display: none !important;
  visibility: hidden !important;
}
`
  }

  /**
   * @returns {HTMLStyleElement}
   */
  const getDropdownMenuStyleElement = () => {
    /** @type {HTMLStyleElement} */
    // @ts-expect-error
    const style = document.getElementById(ID_DROPDOWN_MENU_STYLE)
    return style
  }

  /**
   * @param {HTMLStyleElement} menuStyle
   */
  const hideDropdownMenuElement = (menuStyle) => {
    menuStyle.textContent = `
${SELECTOR_DROPDOWN_MENU} {
  visibility: hidden !important;
}
`
  }

  /**
   * @returns {HTMLButtonElement}
   */
  const getOperationButtonElement = () => {
    return document.querySelector('button[aria-label="操作"]')
  }

  const openDropdownMenuElement = () => {
    const operationButton = getOperationButtonElement()
    operationButton.click()
  }

  /**
   * @returns {HTMLElement}
   */
  const getDropdownMenuElement = () => {
    return document.querySelector(SELECTOR_DROPDOWN_MENU)
  }

  /**
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  const isVideoInfoDialogLinkElement = (element) => {
    return element.textContent === 'メディア情報を表示'
  }

  /**
   * @param {HTMLElement} dropdownMenu
   * @returns {HTMLAnchorElement}
   */
  const findVideoInfoDialogLinkElement = (dropdownMenu) => {
    /** @type {HTMLAnchorElement[]} */
    const links = Array.from(dropdownMenu.querySelectorAll('a.x-menu-list-item'))
    return links.find(isVideoInfoDialogLinkElement)
  }

  /**
   * @param {HTMLStyleElement} menuStyle
   */
  const showDropdownMenuElement = (menuStyle) => {
    menuStyle.textContent = ''
  }

  const openVideoInfoDialog = () => {
    const menuStyle = getDropdownMenuStyleElement()
    console.debug('hide dropdown menu')
    hideDropdownMenuElement(menuStyle)
    console.debug('open dropdown menu')
    openDropdownMenuElement()
    const menu = getDropdownMenuElement()
    const link = findVideoInfoDialogLinkElement(menu)
    link.click()
    console.debug('close dropdown menu indirectly')
    console.debug('show dropdown menu')
    showDropdownMenuElement(menuStyle)
  }

  /**
   * @param {HTMLStyleElement} menuStyle
   */
  const showVideoInfoDialog = (menuStyle) => {
    menuStyle.textContent = ''
  }

  /**
   * @param {Object} params
   * @param {Node} params.target
   * @param {MutationObserverInit} params.options
   * @param {HTMLElementFinder} params.find
   * @param {(element: HTMLElement) => void} params.callback
   */
  const observeAddingHTMLElement = ({
    target,
    options,
    find,
    callback
  }) => {
    const observer = new MutationObserver((records, observer) => {
      const element = find(records)

      if (element) {
        // NOTE: コストが高いので先に止める
        observer.disconnect()
        callback(element)
      }
    })
    observer.observe(target, options)
  }

  /**
   * @returns {Promise<string>}
   */
  const fetchFilePath = () => {
    return new Promise(resolve => {
      const videoInfoDialogStyle = getVideoInfoDialogStyleElement()

      console.debug('start observing #sds-desktop')
      observeAddingHTMLElement({
        target: document.getElementById('sds-desktop'),
        options: {
          childList: true
        },
        find: findVideoInfoDialogElement,
        callback: (dialog) => {
          const filePath = findFilePath(dialog)
          console.debug('close video info dialog')
          closeVideoInfoDialog(dialog)
          console.debug('show video info dialog')
          showVideoInfoDialog(videoInfoDialogStyle)
          resolve(filePath)
        }
      })
      console.debug('hide video info dialog')
      hideVideoInfoDialog(videoInfoDialogStyle)
      console.debug('open video info dialog')
      openVideoInfoDialog()
    })
  }

  /**
   * @param {string} filePath
   * @returns {string}
   */
  const createUrl = (filePath) => {
    const url = `${URL_SCHEME}://${ROOT_DIR}${filePath}`
    return encodeURI(url)
  }

  /**
   * @param {HTMLElement} playButton
   * @returns {HTMLElement}
   */
  const createPlayWithVlcButton = (playButton) => {
    const playWithVlcButton = deepCloneNode(playButton)
    playWithVlcButton.addEventListener('click', () => {
      console.debug('fetch file path')
      fetchFilePath()
        .then(filePath => {
          console.debug(`filePath=${filePath}`)
          const url = createUrl(filePath)
          console.debug(`url=${url}`)
          console.debug(`open ${url}`)
          window.open(url)
        })
    })
    return playWithVlcButton
  }

  /**
   * @param {HTMLElement} element
   * @param {HTMLElement} newElement
   */
  const replaceElement = (element, newElement) => {
    element.style.display = 'none'
    element.parentElement.insertBefore(newElement, element)
  }

  const updatePlayButton = () => {
    console.debug('start observing body')
    observeAddingHTMLElement({
      target: document.body,
      options: {
        childList: true,
        subtree: true
      },
      find: findPlayButtonElement,
      callback: (playButton) => {
        const playWithVlcButton = createPlayWithVlcButton(playButton)
        replaceElement(playButton, playWithVlcButton)
      }
    })
  }

  const main = () => {
    console.debug('start')

    if (isVideoStationPage()) {
      appendStyleElements()
      updatePlayButton()
    }
  }

  main()
})()
