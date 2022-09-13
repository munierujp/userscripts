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

    const createStyleElement = (id) => {
        const style = document.createElement('style');
        style.id = id;
        style.type = 'text/css';
        return style;
    };

    const appendStyleElement = (id) => {
        const style = createStyleElement(id);
        document.head.append(style);
    };

    const ID_DROPDOWN_MENU_STYLE = 'jp-munieru-style-dropdown-menu';
    const ID_VIDEO_INFO_DIALOG_STYLE = 'jp-munieru-style-video-info-dialog';
    const appendStyleElements = () => {
        appendStyleElement(ID_DROPDOWN_MENU_STYLE);
        appendStyleElement(ID_VIDEO_INFO_DIALOG_STYLE);
    };

    const isVideoStationPage = () => {
        const params = new URLSearchParams(location.search);
        const appId = params.get('launchApp');
        return appId === 'SYNO.SDS.VideoStation.AppInstance';
    };

    const createUrl = (filePath) => {
        return encodeURI(`vlc:///Volumes${filePath}`);
    };

    const findCloseButtonElement = (dialog) => {
        return dialog.querySelector('button[aria-label="閉じる"]') ?? undefined;
    };

    const closeVideoInfoDialog = (dialog) => {
        const closeButton = findCloseButtonElement(dialog);
        if (closeButton === undefined) {
            throw new Error('Missing close button element.');
        }
        closeButton.click();
    };

    const findFilePath = (dialog) => {
        return Array.from(dialog.querySelectorAll('tr'))
            .map(row => Array.from(row.querySelectorAll('td')))
            .filter(({ length }) => length >= 2)
            .map(cells => cells.map(({ textContent }) => textContent ?? undefined))
            .filter(([label]) => label === 'ファイル パス')
            .map(([, value]) => value)
            .find(value => value !== undefined);
    };

    const createHTMLElementFinder = (filter) => {
        return mutations => {
            return mutations
                .flatMap(({ addedNodes }) => Array.from(addedNodes).filter((node) => node instanceof HTMLElement))
                .find(element => filter(element));
        };
    };

    const isVideoInfoDialogElement = (element) => {
        return element.classList.contains('video-info-dialog');
    };

    const findVideoInfoDialogElement = createHTMLElementFinder(element => {
        return isVideoInfoDialogElement(element);
    });

    const findVideoInfoDialogStyleElement = () => {
        const element = document.getElementById('jp-munieru-style-video-info-dialog');
        return element instanceof HTMLStyleElement ? element : undefined;
    };

    const hideVideoInfoDialog = (style) => {
        style.textContent = `
.video-info-dialog {
  display: none !important;
  visibility: hidden !important;
}
`;
    };

    // TODO: Promise化
    const observeAddingHTMLElement = ({ target, options, find, callback }) => {
        const observer = new MutationObserver((mutations, observer) => {
            const element = find(mutations);
            if (element !== undefined) {
                // NOTE: コストが高いので先に止める
                observer.disconnect();
                callback(element);
            }
        });
        observer.observe(target, options);
    };

    const SELECTOR_DROPDOWN_MENU = '.syno-ux-menu.syno-vs2-dropdown-menu';
    const findDropdownMenuElement = () => {
        return document.querySelector(SELECTOR_DROPDOWN_MENU) ?? undefined;
    };

    const findDropdownMenuStyleElement = () => {
        const element = document.getElementById('jp-munieru-style-dropdown-menu');
        return element instanceof HTMLStyleElement ? element : undefined;
    };

    const isVideoInfoDialogLinkElement = (element) => {
        return element.textContent === 'メディア情報を表示';
    };

    const findVideoInfoDialogLinkElement = (dropdownMenu) => {
        const links = Array.from(dropdownMenu.querySelectorAll('a.x-menu-list-item'));
        return links.find(link => isVideoInfoDialogLinkElement(link));
    };

    const hideDropdownMenuElement = (style) => {
        style.textContent = `
.syno-ux-menu.syno-vs2-dropdown-menu {
  display: none !important;
  visibility: hidden !important;
}
`;
    };

    const findOperationButtonElement = () => {
        return document.querySelector('button[aria-label="アクション/操作"]') ?? undefined;
    };

    const openDropdownMenuElement = () => {
        const operationButton = findOperationButtonElement();
        if (operationButton === undefined) {
            throw new Error('Missing operation button element.');
        }
        operationButton.click();
    };

    const showDropdownMenuElement = (menuStyle) => {
        menuStyle.textContent = '';
    };

    const openVideoInfoDialog = () => {
        const menuStyle = findDropdownMenuStyleElement();
        if (menuStyle === undefined) {
            throw new Error('Missing menu style element.');
        }
        const menu = findDropdownMenuElement();
        if (menu === undefined) {
            throw new Error('Missing menu element.');
        }
        const link = findVideoInfoDialogLinkElement(menu);
        if (link === undefined) {
            throw new Error('Missing video info dialog link element.');
        }
        hideDropdownMenuElement(menuStyle);
        openDropdownMenuElement();
        link.click();
        showDropdownMenuElement(menuStyle);
    };

    const showVideoInfoDialog = (menuStyle) => {
        menuStyle.textContent = '';
    };

    const fetchFilePath = async () => {
        return await new Promise(resolve => {
            const target = document.getElementById('sds-desktop') ?? undefined;
            if (target === undefined) {
                throw new Error('Missing target element.');
            }
            const videoInfoDialogStyle = findVideoInfoDialogStyleElement();
            if (videoInfoDialogStyle === undefined) {
                throw new Error('Missing video info dialog style element.');
            }
            observeAddingHTMLElement({
                target,
                options: {
                    childList: true
                },
                find: findVideoInfoDialogElement,
                callback: (dialog) => {
                    const filePath = findFilePath(dialog);
                    if (filePath === undefined) {
                        throw new Error('Missing file path.');
                    }
                    closeVideoInfoDialog(dialog);
                    showVideoInfoDialog(videoInfoDialogStyle);
                    resolve(filePath);
                }
            });
            hideVideoInfoDialog(videoInfoDialogStyle);
            openVideoInfoDialog();
        });
    };

    const handleError = (error) => {
        throw error;
    };

    const onClickButton = async () => {
        const filePath = await fetchFilePath();
        const url = createUrl(filePath);
        window.open(url);
    };
    const createPlayWithVlcButton = (playButton) => {
        const playWithVlcButton = playButton.cloneNode(true);
        if (!(playWithVlcButton instanceof HTMLElement)) {
            throw new TypeError('Failed to clone node.');
        }
        playWithVlcButton.addEventListener('click', () => {
            onClickButton().catch(handleError);
        });
        return playWithVlcButton;
    };

    const isPlayButtonElement = (element) => {
        const { classList } = element;
        return classList.contains('x-btn') && classList.contains('play');
    };

    const findPlayButtonElement = createHTMLElementFinder(element => {
        return isPlayButtonElement(element);
    });

    const replaceElement = (element, newElement) => {
        element.style.display = 'none';
        element.before(newElement);
    };

    const updatePlayButton = () => {
        observeAddingHTMLElement({
            target: document.body,
            options: {
                childList: true,
                subtree: true
            },
            find: findPlayButtonElement,
            callback: (playButton) => {
                const playWithVlcButton = createPlayWithVlcButton(playButton);
                replaceElement(playButton, playWithVlcButton);
            }
        });
    };

    // TODO: サムネイル上の小さい再生ボタンも書き換える
    if (isVideoStationPage()) {
        appendStyleElements();
        updatePlayButton();
    }

})();
