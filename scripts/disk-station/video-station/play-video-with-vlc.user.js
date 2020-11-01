// @ts-check

// ==UserScript==
// @name         Play video with VLC
// @namespace    https://github.com/munierujp/
// @version      0.1.4
// @description  Play video with VLC on Video Station of DiskStation
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://munierujp.github.io/userscripts/scripts/disk-station/video-station/play-video-with-vlc.user.js
// @downloadURL  https://munierujp.github.io/userscripts/scripts/disk-station/video-station/play-video-with-vlc.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://diskstation.local:*/?launchApp=SYNO.SDS.VideoStation.AppInstance&SynoToken=*
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

  const URL_SCHEME = 'vlc'
  const ROOT_DIR = '/Volumes'

  /** @typedef {(records: MutationRecord[]) => Element} ElementFinder */

  /**
   * @param {MutationRecord} record
   * @returns {Element[]}
   */
  const toAddedElements = (record) => {
    const addedNodes = record.addedNodes ? Array.from(record.addedNodes) : []
    return addedNodes
      .filter(node => node instanceof Element)
      .map(node => {
        /** @type {Element} */
        // @ts-expect-error
        const element = node
        return element
      })
  }

  /**
   * @param {(element: Element) => boolean} filter
   * @returns {ElementFinder}
   */
  const createElementFinder = (filter) => {
    return (records) => {
      return records
        .map(toAddedElements)
        .reduce((a, b) => a.concat(b), [])
        .find(filter)
    }
  }

  const findPlayButtonElement = createElementFinder(element => {
    const { classList } = element
    return classList.contains('x-btn') && classList.contains('play')
  })

  const findVideoInfoDialogElement = createElementFinder(element => {
    return element.classList.contains('video-info-dialog')
  })

  /**
   * @param {Node} node
   * @returns {Node}
   */
  const deepCloneNode = (node) => {
    return node.cloneNode(true)
  }

  /**
   * @param {Element} dialog
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
   * @param {Element} dialog
   */
  const closeVideoInfoDialog = (dialog) => {
    /** @type {HTMLButtonElement} */
    const closeButton = dialog.querySelector('button[aria-label="閉じる"]')
    closeButton.click()
  }

  /**
   * @param {Element} element
   * @returns {boolean}
   */
  const isVideoInfoDialogLinkElement = (element) => {
    return element.textContent === 'メディア情報を表示'
  }

  // TODO: チラつきを防ぐために事前にmenuをCSSで非表示化してから実行し、実行後に非表示化を解除する
  const openVideoInfoDialog = () => {
    /** @type {HTMLButtonElement} */
    const operationButton = document.querySelector('button[aria-label="操作"]')
    operationButton.click()
    /** @type {HTMLElement} */
    const menu = document.querySelector('.syno-vs2-dropdown-menu')
    /** @type {HTMLAnchorElement[]} */
    const links = Array.from(menu.querySelectorAll('a.x-menu-list-item'))
    const link = links.find(isVideoInfoDialogLinkElement)
    link.click()
  }

  // TODO: チラつきを防ぐために事前にdialogをCSSで非表示化してから実行し、実行後に非表示化を解除する
  /**
   * @returns {Promise<string>}
   */
  const fetchFilePath = () => {
    return new Promise((resolve) => {
      const observer = new MutationObserver((records, observer) => {
        const dialog = findVideoInfoDialogElement(records)

        if (dialog) {
          const filePath = findFilePath(dialog)
          resolve(filePath)
          closeVideoInfoDialog(dialog)
          observer.disconnect()
        }
      })
      observer.observe(document.getElementById('sds-desktop'), {
        childList: true
      })
      openVideoInfoDialog()
    })
  }

  /**
   * @param {Element} playButton
   */
  const replacePlayButton = (playButton) => {
    const playWithVlcButton = deepCloneNode(playButton)
    playWithVlcButton.addEventListener('click', () => {
      console.debug('fetch file path')
      fetchFilePath()
        .then(filePath => {
          console.debug(`filePath=${filePath}`)
          const url = `${URL_SCHEME}://${ROOT_DIR}${filePath}`
          console.debug(`url=${url}`)
          return url
        })
        .then(url => {
          console.debug(`open ${url}`)
          window.open(url)
        })
    })
    playButton.parentElement.appendChild(playWithVlcButton)
    playButton.parentElement.removeChild(playButton)
  }

  const main = () => {
    console.debug('start')
    const observer = new MutationObserver((records, observer) => {
      const playButton = findPlayButtonElement(records)

      if (playButton) {
        console.debug('playButton', playButton)
        console.debug('replace play button')
        replacePlayButton(playButton)
        console.debug('end observing document.body')
        observer.disconnect()
      }
    })
    console.debug('start observing document.body')
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })
  }

  main()
})()
