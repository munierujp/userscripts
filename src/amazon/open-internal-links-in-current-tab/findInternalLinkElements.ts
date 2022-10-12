export const findInternalLinkElements = (): HTMLAnchorElement[] => {
  return Array.from(document.querySelectorAll('a[href^="/"][target="_blank"]'))
}
