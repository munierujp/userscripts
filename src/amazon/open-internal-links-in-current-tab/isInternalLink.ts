export const isInternalLink = (element: Element): boolean => {
  const href = element.getAttribute('href')
  return href?.startsWith('/') ?? false
}
