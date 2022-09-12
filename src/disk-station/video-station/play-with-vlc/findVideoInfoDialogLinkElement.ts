import { isVideoInfoDialogLinkElement } from './isVideoInfoDialogLinkElement'

export const findVideoInfoDialogLinkElement = (dropdownMenu: HTMLElement): HTMLAnchorElement | undefined => {
  const links = Array.from(dropdownMenu.querySelectorAll<HTMLAnchorElement>('a.x-menu-list-item'))
  return links.find(link => isVideoInfoDialogLinkElement(link))
}
