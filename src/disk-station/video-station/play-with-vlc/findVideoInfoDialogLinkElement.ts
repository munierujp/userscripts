export const findVideoInfoDialogLinkElement = (): HTMLAnchorElement | undefined => {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('a.x-menu-list-item'))
  return links.find(({ textContent }) => textContent === 'メディア情報を表示')
}
