export const isPlayButton = (element: Element): boolean => {
  const { classList } = element
  return classList.contains('x-btn') && classList.contains('play')
}
