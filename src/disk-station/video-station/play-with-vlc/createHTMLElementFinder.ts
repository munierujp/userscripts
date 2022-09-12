import { HTMLElementFinder } from './HTMLElementFinder'

export const createHTMLElementFinder = (filter: (element: HTMLElement) => boolean): HTMLElementFinder => {
  return mutations => {
    return mutations
      .flatMap(({ addedNodes }) => Array.from(addedNodes).filter((node): node is HTMLElement => node instanceof HTMLElement))
      .find(element => filter(element))
  }
}
