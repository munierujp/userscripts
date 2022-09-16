// ==UserScript==
// @name         VLCで再生
// @namespace    https://github.com/munierujp/
// @version      1.1.0
// @description  DiskStationのVideo Stationで動画をVLCで再生します。
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
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

    const isHTMLElement = (value) => {
        return value instanceof HTMLElement;
    };

    const cloneNode = (node) => {
        return node.cloneNode(true);
    };

    const createUrl = (filePath) => {
        return encodeURI(`vlc:///Volumes${filePath}`);
    };

    const findDesktop = () => {
        return document.getElementById('sds-desktop') ?? undefined;
    };

    const isElement = (value) => {
        return value instanceof Element;
    };

    const findActionButton = () => {
        return document.querySelector('button[aria-label="アクション/操作"]') ?? undefined;
    };

    const findMediaInfoLink = () => {
        return Array.from(document.querySelectorAll('a.x-menu-list-item'))
            .find(({ textContent }) => textContent === 'メディア情報を表示');
    };

    class MediaInfoDialog {
        constructor(element) {
            this.element = element;
        }
        static fromMutations(mutations) {
            const element = mutations
                // eslint-disable-next-line unicorn/no-array-callback-reference
                .flatMap(({ addedNodes }) => Array.from(addedNodes).filter(isElement))
                .find(({ classList }) => classList.contains('video-info-dialog'));
            if (element === undefined) {
                return undefined;
            }
            return new MediaInfoDialog(element);
        }
        static open() {
            const actionButton = findActionButton();
            if (actionButton === undefined) {
                throw new Error('Missing action button.');
            }
            actionButton.click();
            const mediaInfoLink = findMediaInfoLink();
            if (mediaInfoLink === undefined) {
                throw new Error('Missing media info link.');
            }
            mediaInfoLink.click();
        }
        close() {
            const closeButton = this.element.querySelector('button[aria-label="閉じる"]');
            if (closeButton === null) {
                throw new Error('Missing close button.');
            }
            closeButton.click();
        }
        findFilePath() {
            return Array.from(this.element.querySelectorAll('tr'))
                .map(row => Array.from(row.querySelectorAll('td')))
                .filter(({ length }) => length >= 2)
                .map(cells => cells.map(({ textContent }) => textContent ?? undefined))
                .filter(([label]) => label === 'ファイル パス')
                .map(([, value]) => value)
                .find(value => value !== undefined);
        }
    }

    const fetchFilePath = async () => {
        return await new Promise((resolve, reject) => {
            const desktop = findDesktop();
            if (desktop === undefined) {
                throw new Error('Missing desktop.');
            }
            const observer = new MutationObserver((mutations, observer) => {
                const mediaInfoDialog = MediaInfoDialog.fromMutations(mutations);
                if (mediaInfoDialog === undefined) {
                    return;
                }
                // NOTE: DOMを監視するコストが高いので、目的の要素が追加されたらすぐに止める
                observer.disconnect();
                const filePath = mediaInfoDialog.findFilePath();
                mediaInfoDialog.close();
                if (filePath !== undefined) {
                    resolve(filePath);
                }
                else {
                    reject(new Error('Missing file path.'));
                }
            });
            observer.observe(desktop, {
                childList: true
            });
            MediaInfoDialog.open();
        });
    };

    const handleError = (error) => {
        throw error;
    };

    const handleClick = async () => {
        const filePath = await fetchFilePath();
        const url = createUrl(filePath);
        window.open(url);
    };
    const createPlayWithVlcButton = (playButton) => {
        const button = cloneNode(playButton);
        button.addEventListener('click', () => {
            handleClick().catch(handleError);
        });
        return button;
    };

    const isPlayButton = (element) => {
        const { classList } = element;
        return classList.contains('x-btn') && classList.contains('play');
    };

    const handleVideoStation = () => {
        const observer = new MutationObserver((mutations, observer) => {
            const playButton = mutations
                // eslint-disable-next-line unicorn/no-array-callback-reference
                .flatMap(({ addedNodes }) => Array.from(addedNodes).filter(isHTMLElement))
                .find(element => isPlayButton(element));
            if (playButton === undefined) {
                return;
            }
            // NOTE: DOMを監視するコストが高いので、目的の要素が追加されたらすぐに止める
            observer.disconnect();
            const playWithVlcButton = createPlayWithVlcButton(playButton);
            playButton.style.display = 'none';
            playButton.after(playWithVlcButton);
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
