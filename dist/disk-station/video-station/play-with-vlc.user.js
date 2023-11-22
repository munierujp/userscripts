// ==UserScript==
// @name         VLCで再生
// @namespace    https://github.com/munierujp/
// @version      1.1.7
// @description  DiskStationのVideo Stationで動画をVLCで再生します。
// @author       https://github.com/munierujp/
// @homepage     https://github.com/munierujp/userscripts/tree/master/src/disk-station/video-station/play-with-vlc
// @homepageURL  https://github.com/munierujp/userscripts/tree/master/src/disk-station/video-station/play-with-vlc
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/disk-station/video-station/play-with-vlc.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/disk-station/video-station/play-with-vlc.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        *://diskstation.local/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const isVideoStationPage = (url) => {
        return url.searchParams.get('launchApp') === 'SYNO.SDS.VideoStation.AppInstance';
    };

    const cloneNode = (node) => {
        return node.cloneNode(true);
    };

    const isElement = (value) => {
        return value instanceof Element;
    };

    const isHTMLElement = (value) => {
        return value instanceof HTMLElement;
    };

    const findDesktopElement = () => {
        return document.getElementById('sds-desktop') ?? undefined;
    };

    const findActionButtonElement = () => {
        return document.querySelector('button[aria-label="アクション/操作"]') ?? undefined;
    };

    const findMediaInfoLinkElement = () => {
        return Array.from(document.querySelectorAll('a.x-menu-list-item'))
            .find(({ textContent }) => textContent === 'メディア情報を表示');
    };

    class MediaInfoDialogElement {
        element;
        constructor(element) {
            this.element = element;
        }
        static fromMutations(mutations) {
            const element = mutations
                .flatMap(({ addedNodes }) => Array.from(addedNodes).filter(isElement))
                .find(({ classList }) => classList.contains('video-info-dialog'));
            return element === undefined ? undefined : new MediaInfoDialogElement(element);
        }
        static open() {
            const actionButtonElement = findActionButtonElement();
            if (actionButtonElement === undefined) {
                throw new Error('Missing action button element.');
            }
            actionButtonElement.click();
            const mediaInfoLinkElement = findMediaInfoLinkElement();
            if (mediaInfoLinkElement === undefined) {
                throw new Error('Missing media info link element.');
            }
            mediaInfoLinkElement.click();
        }
        close() {
            const closeButton = this.findCloseButtonElement();
            if (closeButton === undefined) {
                throw new Error('Missing close button element.');
            }
            closeButton.click();
        }
        findCloseButtonElement() {
            return this.element.querySelector('button[aria-label="閉じる"]') ?? undefined;
        }
        findFilePath() {
            return this.findRowElements()
                .map(row => Array.from(row.querySelectorAll('td')))
                .filter(({ length }) => length >= 2)
                .map(cells => cells.map(({ textContent }) => textContent ?? undefined))
                .filter(([label]) => label === 'ファイル パス')
                .map(([, value]) => value)
                .find(value => value !== undefined);
        }
        findRowElements() {
            return Array.from(this.element.querySelectorAll('tr'));
        }
    }

    const fetchFilePath = async () => {
        return await new Promise((resolve, reject) => {
            const desktopElement = findDesktopElement();
            if (desktopElement === undefined) {
                throw new Error('Missing desktop element.');
            }
            const observer = new MutationObserver((mutations, observer) => {
                const mediaInfoDialogElement = MediaInfoDialogElement.fromMutations(mutations);
                if (mediaInfoDialogElement === undefined) {
                    return;
                }
                observer.disconnect();
                const path = mediaInfoDialogElement.findFilePath();
                mediaInfoDialogElement.close();
                if (path === undefined) {
                    reject(new Error('Missing file path.'));
                }
                else {
                    resolve(path);
                }
            });
            observer.observe(desktopElement, {
                childList: true
            });
            MediaInfoDialogElement.open();
        });
    };

    const handleError = (error) => {
        throw error;
    };

    class PlayButtonElement {
        element;
        constructor(element) {
            this.element = element;
        }
        static fromMutations(mutations) {
            const element = mutations
                .flatMap(({ addedNodes }) => Array.from(addedNodes).filter(isHTMLElement))
                .find(element => PlayButtonElement.isPlayButtonElement(element));
            return element === undefined ? undefined : new PlayButtonElement(element);
        }
        static isPlayButtonElement(element) {
            const { classList } = element;
            return classList.contains('x-btn') && classList.contains('play');
        }
        replace() {
            const button = cloneNode(this.element);
            button.addEventListener('click', () => {
                this.handleClick().catch(handleError);
            });
            this.element.style.display = 'none';
            this.element.after(button);
        }
        async handleClick() {
            const path = await fetchFilePath();
            const url = encodeURI(`vlc:///Volumes${path}`);
            window.open(url);
        }
    }

    const handleVideoStation = () => {
        const observer = new MutationObserver((mutations, observer) => {
            const playButtonElement = PlayButtonElement.fromMutations(mutations);
            if (playButtonElement === undefined) {
                return;
            }
            observer.disconnect();
            playButtonElement.replace();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };

    if (isVideoStationPage(new URL(location.href))) {
        handleVideoStation();
    }

})();
