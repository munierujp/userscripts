// ==UserScript==
// @name         食べログブロッカー
// @namespace    https://github.com/munierujp/
// @version      0.1.0
// @description  食べログに店舗のブロック機能を追加します。
// @author       https://github.com/munierujp/
// @homepage     https://github.com/munierujp/userscripts
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/tabelog/blocker.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/tabelog/blocker.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        *://tabelog.com/rstLst/*
// @match        *://tabelog.com/*/rstLst/*
// @require      https://cdn.jsdelivr.net/npm/dexie@3.2.3/dist/dexie.min.js
// @grant        none
// ==/UserScript==

(function (Dexie) {
    'use strict';

    const handleError = (error) => {
        throw error;
    };

    class BlockLinksAppender {
        constructor(db) {
            this.db = db;
        }
        append(restaurantElements) {
            this.appendStyleElement();
            restaurantElements.forEach(restaurantElement => {
                this.appendBlockButtonElement(restaurantElement);
            });
        }
        appendStyleElement() {
            const styleElement = document.createElement('style');
            styleElement.textContent = `.flexible-rstlst-main .list-rst__rst-name {
  width: calc(100% - 60px * 3);
}

.list-rst__bookmark {
  width: calc(50px * 3);
}

@media screen and (max-width: 1260px) {
  .flexible-rstlst-main .list-rst__bookmark {
    width: calc(60px * 3);
  }
}

.p-btn-bkm__item {
  width: calc(100% / 3);
}

.munierujp-tabelog-blocker-block-icon::before {
  content: "\\f619";
}`;
            document.head.append(styleElement);
        }
        appendBlockButtonElement(restaurantElement) {
            const blockButtonElement = this.createBlockButtonElement(restaurantElement);
            if (blockButtonElement !== undefined) {
                restaurantElement.bookmarkElement?.prepend(blockButtonElement);
            }
        }
        createBlockButtonElement(restaurantElement) {
            const { id, name } = restaurantElement;
            if (id === undefined || name === undefined) {
                return undefined;
            }
            const blockButtonElement = document.createElement('div');
            blockButtonElement.classList.add('p-btn-bkm__item', 'list-rst__bookmark-btn');
            const buttonWrapperElement = document.createElement('div');
            blockButtonElement.append(buttonWrapperElement);
            const buttonElement = document.createElement('button');
            buttonElement.classList.add('c-icon-save__target', 'munierujp-tabelog-blocker-block-icon');
            buttonElement.textContent = 'ブロック';
            const handleClick = async () => {
                if (window.confirm(`${name}をブロックしますか？`)) {
                    restaurantElement.hide();
                    await this.db.restaurants.add({
                        id,
                        name
                    });
                }
            };
            buttonElement.addEventListener('click', () => {
                handleClick().catch(handleError);
            });
            buttonWrapperElement.append(buttonElement);
            return blockButtonElement;
        }
    }

    class Database extends Dexie {
        constructor() {
            super('munierujp-tabelog-blocker');
            this.version(1).stores({
                restaurants: 'id'
            });
        }
    }

    class RestaurantElement {
        constructor(element) {
            this.element = element;
        }
        get id() {
            return this.element.dataset.rstId;
        }
        get name() {
            return this.element.querySelector('.list-rst__rst-name-target')?.textContent ?? undefined;
        }
        get bookmarkElement() {
            return this.element.querySelector('.p-btn-bkm') ?? undefined;
        }
        append(node) {
            this.element.append(node);
        }
        hide() {
            this.element.style.display = 'none';
        }
    }

    class RestaurantHider {
        constructor(db) {
            this.db = db;
        }
        async hide(restaurantElements) {
            for (const restaurantElement of restaurantElements) {
                await this.hideRestaurant(restaurantElement);
            }
        }
        async hideRestaurant(restaurantElement) {
            const { id } = restaurantElement;
            if (id === undefined) {
                return;
            }
            const restaurant = await this.db.restaurants.get(id);
            if (restaurant !== undefined) {
                restaurantElement.hide();
            }
        }
    }

    const restaurantElements = Array.from(document.querySelectorAll('.js-rstlist-info .list-rst'))
        .map(element => new RestaurantElement(element));
    if (restaurantElements.length > 0) {
        const db = new Database();
        const restaurantHider = new RestaurantHider(db);
        restaurantHider.hide(restaurantElements).catch(handleError);
        const blockLinksAppender = new BlockLinksAppender(db);
        blockLinksAppender.append(restaurantElements);
    }

})(Dexie);
