export const isPlayButtonElement = (element: Element): boolean => {
  const { classList } = element
  return classList.contains('x-btn') && classList.contains('play')
}
