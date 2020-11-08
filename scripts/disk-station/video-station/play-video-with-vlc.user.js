// @ts-check

// ==UserScript==
// @name         Play video with VLC
// @namespace    https://github.com/munierujp/
// @version      0.1.9
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
   * @returns {HTMLButtonElement}
   */
  const getOperationButtonElement = () => {
    return document.querySelector('button[aria-label="操作"]')
  }

  /**
   * @returns {HTMLElement}
   */
  const getDropdownMenuElement = () => {
    return document.querySelector('.syno-vs2-dropdown-menu')
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

  // TODO: チラつきを防ぐために事前にmenuをCSSで非表示化してから実行し、実行後に非表示化を解除する
  const openVideoInfoDialog = () => {
    const operationButton = getOperationButtonElement()
    operationButton.click()
    const menu = getDropdownMenuElement()
    const link = findVideoInfoDialogLinkElement(menu)
    link.click()
  }

  // TODO: チラつきを防ぐために事前にdialogをCSSで非表示化してから実行し、実行後に非表示化を解除する
  /**
   * @returns {Promise<string>}
   */
  const fetchFilePath = () => {
    return new Promise(resolve => {
      const observer = new MutationObserver((records, observer) => {
        const dialog = findVideoInfoDialogElement(records)

        if (dialog) {
          // NOTE: コストが高いので先に止める
          console.debug('end observing #sds-desktop')
          observer.disconnect()
          const filePath = findFilePath(dialog)
          closeVideoInfoDialog(dialog)
          return resolve(filePath)
        }
      })
      console.debug('start observing #sds-desktop')
      observer.observe(document.getElementById('sds-desktop'), {
        childList: true
      })
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
    element.parentElement.appendChild(newElement)
    element.remove()
  }

  /**
   * @param {HTMLElement} playButton
   */
  const replacePlayButton = (playButton) => {
    const playWithVlcButton = createPlayWithVlcButton(playButton)
    replaceElement(playButton, playWithVlcButton)
  }

  const updatePlayButton = () => {
    const observer = new MutationObserver((records, observer) => {
      const playButton = findPlayButtonElement(records)

      if (playButton) {
        // NOTE: コストが高いので先に止める
        console.debug('end observing body')
        observer.disconnect()
        console.debug('replace play button')
        replacePlayButton(playButton)
      }
    })
    console.debug('start observing body')
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  }

  const main = () => {
    console.debug('start')

    if (isVideoStationPage()) {
      updatePlayButton()
    }
  }

  main()
})()
