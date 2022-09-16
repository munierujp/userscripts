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

    const cloneNode = (node) => {
        return node.cloneNode(true);
    };

    const createUrl = (filePath) => {
        return encodeURI(`vlc:///Volumes${filePath}`);
    };

    const findDesktop = () => {
        return document.getElementById('sds-desktop') ?? undefined;
    };

    const ID = 'jp-munieru-style-dropdown-menu';
    class DropdownMenuStyle {
        constructor(element) {
            this.element = element;
        }
        static create() {
            const element = document.createElement('style');
            element.id = ID;
            element.type = 'text/css';
            document.head.append(element);
            return new DropdownMenuStyle(element);
        }
        static find() {
            const element = document.getElementById(ID);
            return element instanceof HTMLStyleElement ? new DropdownMenuStyle(element) : undefined;
        }
        hideDropdownMenu() {
            this.element.textContent = `
.syno-ux-menu.syno-vs2-dropdown-menu {
  display: none !important;
  visibility: hidden !important;
}
`;
        }
        showDropdownMenu() {
            this.element.textContent = '';
        }
    }

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
        static findFromMutations(mutations) {
            const element = mutations
                .flatMap(({ addedNodes }) => Array.from(addedNodes).filter((node) => node instanceof Element))
                .find(({ classList }) => classList.contains('video-info-dialog'));
            if (element === undefined) {
                return undefined;
            }
            return new MediaInfoDialog(element);
        }
        static open() {
            const dropdownMenuStyle = DropdownMenuStyle.find();
            if (dropdownMenuStyle === undefined) {
                throw new Error('Missing dropdown menu style.');
            }
            const actionButton = findActionButton();
            if (actionButton === undefined) {
                throw new Error('Missing action button.');
            }
            dropdownMenuStyle.hideDropdownMenu();
            actionButton.click();
            const mediaInfoLink = findMediaInfoLink();
            if (mediaInfoLink === undefined) {
                throw new Error('Missing media info link.');
            }
            mediaInfoLink.click();
            dropdownMenuStyle.showDropdownMenu();
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
        close() {
            const closeButton = this.element.querySelector('button[aria-label="閉じる"]');
            if (closeButton === null) {
                throw new Error('Missing close button.');
            }
            closeButton.click();
        }
    }

    const fetchFilePath = async () => {
        const desktop = findDesktop();
        if (desktop === undefined) {
            throw new Error('Missing desktop.');
        }
        return await new Promise((resolve, reject) => {
            const observer = new MutationObserver((mutations, observer) => {
                const mediaInfoDialog = MediaInfoDialog.findFromMutations(mutations);
                if (mediaInfoDialog === undefined) {
                    return;
                }
                // NOTE: コストが高いので目的の要素が追加されたらすぐに止める
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

    const onClickButton = async () => {
        const filePath = await fetchFilePath();
        const url = createUrl(filePath);
        window.open(url);
    };
    const createPlayWithVlcButton = (playButton) => {
        const playWithVlcButton = cloneNode(playButton);
        playWithVlcButton.addEventListener('click', () => {
            onClickButton().catch(error => {
                throw error;
            });
        });
        return playWithVlcButton;
    };

    if (isVideoStationPage(new URL(location.href))) {
        DropdownMenuStyle.create();
        const observer = new MutationObserver((mutations, observer) => {
            const playButton = mutations
                .flatMap(({ addedNodes }) => Array.from(addedNodes).filter((node) => node instanceof HTMLElement))
                .find(({ classList }) => classList.contains('x-btn') && classList.contains('play'));
            if (playButton === undefined) {
                return;
            }
            // NOTE: コストが高いので目的の要素が追加されたらすぐに止める
            observer.disconnect();
            const playWithVlcButton = createPlayWithVlcButton(playButton);
            playButton.style.display = 'none';
            playButton.before(playWithVlcButton);
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

})();
