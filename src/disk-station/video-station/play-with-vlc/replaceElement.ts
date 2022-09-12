export const replaceElement = (element: HTMLElement, newElement: HTMLElement): void => {
  element.style.display = 'none'
  element.before(newElement)
}
