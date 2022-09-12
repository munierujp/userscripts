export const isPlayButtonElement = (element: HTMLElement): boolean => {
  const { classList } = element
  return classList.contains('x-btn') && classList.contains('play')
}
