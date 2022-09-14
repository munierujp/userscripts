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

    const isVideoStationPage = (url) => {
        return url.searchParams.get('launchApp') === 'SYNO.SDS.VideoStation.AppInstance';
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

    const findVideoInfoDialogStyleElement = () => {
        const element = document.getElementById('jp-munieru-style-video-info-dialog');
        return element instanceof HTMLStyleElement ? element : undefined;
    };

    const findActionButtonElement = () => {
        return document.querySelector('button[aria-label="アクション/操作"]') ?? undefined;
    };

    const findDropdownMenuStyleElement = () => {
        const element = document.getElementById('jp-munieru-style-dropdown-menu');
        return element instanceof HTMLStyleElement ? element : undefined;
    };

    const findOperationButtonElement = () => {
        return document.querySelector('button[aria-label="アクション/操作"]') ?? undefined;
    };

    const findVideoInfoDialogLinkElement = () => {
        const links = Array.from(document.querySelectorAll('a.x-menu-list-item'));
        return links.find(({ textContent }) => textContent === 'メディア情報を表示');
    };

    const hideDropdownMenuElement = (style) => {
        style.textContent = `
.syno-ux-menu.syno-vs2-dropdown-menu {
  display: none !important;
  visibility: hidden !important;
}
`;
    };

    const showDropdownMenuElement = (menuStyle) => {
        menuStyle.textContent = '';
    };

    const openVideoInfoDialog = () => {
        const dropdownMenuStyle = findDropdownMenuStyleElement();
        if (dropdownMenuStyle === undefined) {
            throw new Error('Missing dropdown menu style element.');
        }
        const actionButton = findActionButtonElement();
        if (actionButton === undefined) {
            throw new Error('Missing action button element.');
        }
        actionButton.click();
        const videoInfoDialogLink = findVideoInfoDialogLinkElement();
        if (videoInfoDialogLink === undefined) {
            throw new Error('Missing video info dialog link element.');
        }
        hideDropdownMenuElement(dropdownMenuStyle);
        const operationButton = findOperationButtonElement();
        if (operationButton === undefined) {
            throw new Error('Missing operation button element.');
        }
        operationButton.click();
        videoInfoDialogLink.click();
        showDropdownMenuElement(dropdownMenuStyle);
    };

    const fetchFilePath = async () => {
        const desktop = document.getElementById('sds-desktop');
        if (desktop === null) {
            throw new Error('Missing desktop element.');
        }
        const videoInfoDialogStyle = findVideoInfoDialogStyleElement();
        if (videoInfoDialogStyle === undefined) {
            throw new Error('Missing video info dialog style element.');
        }
        return await new Promise(resolve => {
            const observer = new MutationObserver((mutations, observer) => {
                const videoInfoDialog = mutations
                    .flatMap(({ addedNodes }) => Array.from(addedNodes).filter((node) => node instanceof HTMLElement))
                    .find(({ classList }) => classList.contains('video-info-dialog'));
                if (videoInfoDialog === undefined) {
                    return;
                }
                // NOTE: コストが高いので目的の要素が追加されたらすぐに止める
                observer.disconnect();
                const filePath = findFilePath(videoInfoDialog);
                if (filePath === undefined) {
                    throw new Error('Missing file path.');
                }
                closeVideoInfoDialog(videoInfoDialog);
                resolve(filePath);
            });
            observer.observe(desktop, {
                childList: true
            });
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

    const updatePlayButton = () => {
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
    };

    // TODO: サムネイル上の小さい再生ボタンも書き換える
    const ID_DROPDOWN_MENU_STYLE = 'jp-munieru-style-dropdown-menu';
    const ID_VIDEO_INFO_DIALOG_STYLE = 'jp-munieru-style-video-info-dialog';
    if (isVideoStationPage(new URL(location.href))) {
        appendStyleElement(ID_DROPDOWN_MENU_STYLE);
        appendStyleElement(ID_VIDEO_INFO_DIALOG_STYLE);
        updatePlayButton();
    }

})();
