import typescript from '@rollup/plugin-typescript'
import type { RollupOptions } from 'rollup'

const config: RollupOptions[] = [
  {
    input: 'src/amazon/add-bought-kindle-book-to-booklog/main.ts',
    output: {
      file: 'dist/amazon/add-bought-kindle-book-to-booklog.user.js',
      format: 'iife',
      banner: `// ==UserScript==
// @name        Kindle本の購入完了時にブクログに登録
// @namespace    https://github.com/munierujp/
// @version      0.2.0
// @description   AmazonでKindle本の購入完了時にブクログに読書状況を積読として登録します。
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/amazon/add-bought-kindle-book-to-booklog.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/amazon/add-bought-kindle-book-to-booklog.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://www.amazon.co.jp/kindle-dbs/thankYouPage?*
// @match        https://booklog.jp/item/1/*
// @grant        none
// ==/UserScript==`
    },
    plugins: [typescript()]
  },
  {
    input: 'src/amazon/open-internal-links-in-current-tab/main.ts',
    output: {
      file: 'dist/amazon/open-internal-links-in-current-tab.user.js',
      format: 'iife',
      banner: `// ==UserScript==
// @name        サイト内リンクを現在のタブで開く
// @namespace    https://github.com/munierujp/
// @version      0.2.0
// @description   Amazonでサイト内リンクを現在のタブで開きます。
// @author       https://github.com/munierujp/
// @homepageURL  https://github.com/munierujp/userscripts
// @updateURL    https://github.com/munierujp/userscripts/raw/master/dist/amazon/open-internal-links-in-current-tab.user.js
// @downloadURL  https://github.com/munierujp/userscripts/raw/master/dist/amazon/open-internal-links-in-current-tab.user.js
// @supportURL   https://github.com/munierujp/userscripts/issues
// @match        https://www.amazon.co.jp/*
// @grant        none
// ==/UserScript==`
    },
    plugins: [typescript()]
  }
]

export default config
