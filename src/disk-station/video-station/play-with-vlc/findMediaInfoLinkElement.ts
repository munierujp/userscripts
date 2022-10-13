export const findMediaInfoLinkElement = (): HTMLAnchorElement | undefined => {
  return Array.from(document.querySelectorAll<HTMLAnchorElement>('a.x-menu-list-item'))
    .find(({ textContent }) => textContent === 'メディア情報を表示')
}
