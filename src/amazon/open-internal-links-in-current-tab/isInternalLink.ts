// TODO: テストを書く
export const isInternalLink = (element: HTMLAnchorElement): boolean => {
  const href = element.getAttribute('href')
  return href?.startsWith('/') ?? false
}
