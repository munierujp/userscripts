// ==UserScript==
// @name         作品の非表示
// @namespace    https://github.com/munierujp/
// @version      0.1.0
// @description  映画.comに作品の非表示機能を追加します。
// @author       https://github.com/munierujp/
// @homepage     https://github.com/munierujp/userscripts/tree/master/src/eiga-dot-com/hide-movie
// @homepageURL  https://github.com/munierujp/userscripts/tree/master/src/eiga-dot-com/hide-movie
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/eiga-dot-com/hide-movie.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/eiga-dot-com/hide-movie.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        *://eiga.com/coming/*
// @require      https://cdn.jsdelivr.net/npm/dexie@4.0.4/dist/dexie.min.js
// @grant        none
// ==/UserScript==

(function (Dexie) {
    'use strict';

    const handleError = (error) => {
        throw error;
    };

    const DexieClass = Dexie;
    class Database extends DexieClass {
        movies;
        constructor() {
            super('munierujp-eiga-dot-com-hide-movie');
            this.version(1).stores({
                movies: 'id'
            });
        }
    }
    const database = new Database();

    const createHideButtonItemElement = (movieElement) => {
        const { id, title } = movieElement;
        if (id === undefined || title === undefined) {
            return undefined;
        }
        const hideButtonItemElement = document.createElement('li');
        const hideButtonElement = document.createElement('a');
        hideButtonElement.classList.add('btn', 'small');
        const hideButtonLabelElement = document.createElement('span');
        hideButtonLabelElement.classList.add('icon', 'block');
        hideButtonLabelElement.textContent = '非表示';
        hideButtonElement.append(hideButtonLabelElement);
        const handleClick = async () => {
            if (window.confirm(`${title}を非表示にしますか？`)) {
                movieElement.hide();
                await database.movies.add({
                    id,
                    title
                });
            }
        };
        hideButtonElement.addEventListener('click', () => {
            handleClick().catch(handleError);
        });
        hideButtonItemElement.append(hideButtonElement);
        return hideButtonItemElement;
    };

    class MovieElement {
        element;
        constructor(element) {
            this.element = element;
        }
        get id() {
            return this.element.querySelector('.title a')?.getAttribute('href')?.match(/\/(\d+)\//)?.[1];
        }
        get title() {
            return this.element.querySelector('.title')?.textContent ?? undefined;
        }
        get buttonListElement() {
            return this.element.querySelector('.link-btn') ?? undefined;
        }
        append(node) {
            this.element.append(node);
        }
        hide() {
            this.element.style.display = 'none';
        }
    }

    const findMovieElements = () => {
        return Array.from(document.querySelectorAll('.list-block'))
            .map(element => new MovieElement(element));
    };

    const hideMovieElement = async (movieElement) => {
        const { id } = movieElement;
        if (id === undefined) {
            return;
        }
        const movie = await database.movies.get(id);
        if (movie !== undefined) {
            movieElement.hide();
        }
    };

    const movieElements = findMovieElements();
    movieElements.forEach(movieElement => {
        hideMovieElement(movieElement).catch(handleError);
        const hideButtonItemElement = createHideButtonItemElement(movieElement);
        if (hideButtonItemElement !== undefined) {
            movieElement.buttonListElement?.append(hideButtonItemElement);
        }
    });

})(Dexie);
