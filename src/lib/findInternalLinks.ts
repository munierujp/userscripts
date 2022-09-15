export const findInternalLinks = (): HTMLAnchorElement[] => {
  return Array.from(document.querySelectorAll('a[href^="/"]'))
}
