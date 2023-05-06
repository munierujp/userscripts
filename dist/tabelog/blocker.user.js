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
            restaurantElements.forEach(restaurantElement => {
                this.appendLinkElement(restaurantElement);
            });
        }
        appendLinkElement(restaurantElement) {
            const linkElement = this.createLinkElement(restaurantElement);
            if (linkElement !== undefined) {
                restaurantElement.append(linkElement);
            }
        }
        createLinkElement(restaurantElement) {
            const { id, name } = restaurantElement;
            if (id === undefined || name === undefined) {
                return undefined;
            }
            const linkElement = document.createElement('a');
            linkElement.style.cursor = 'pointer';
            linkElement.textContent = 'この店舗をブロックする';
            const handleClick = async () => {
                if (window.confirm(`${name}をブロックしますか？`)) {
                    restaurantElement.hide();
                    await this.db.restaurants.add({
                        id,
                        name
                    });
                }
            };
            linkElement.addEventListener('click', () => {
                handleClick().catch(handleError);
            });
            return linkElement;
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
            restaurantElements.forEach(restaurantElement => {
                this.hideRestaurant(restaurantElement).catch(handleError);
            });
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

    const db = new Database();
    const restaurantElements = Array.from(document.querySelectorAll('.js-rstlist-info .list-rst'))
        .map(element => new RestaurantElement(element));
    const restaurantHider = new RestaurantHider(db);
    restaurantHider.hide(restaurantElements).catch(handleError);
    const blockLinksAppender = new BlockLinksAppender(db);
    blockLinksAppender.append(restaurantElements);

})(Dexie);
