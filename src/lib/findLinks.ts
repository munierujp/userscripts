export const findLinks = (): HTMLAnchorElement[] => {
  return Array.from(document.getElementsByTagName('a'))
}
