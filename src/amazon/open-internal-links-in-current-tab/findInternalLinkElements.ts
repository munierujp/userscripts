/**
 * 内部リンク要素を取得します。
 * @returns 内部リンク要素
 */
export const findInternalLinkElements = (): HTMLAnchorElement[] => {
  return Array.from(document.querySelectorAll('a[href^="/"][target="_blank"]'))
}
