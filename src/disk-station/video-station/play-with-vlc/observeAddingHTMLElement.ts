import { HTMLElementFinder } from './HTMLElementFinder'

// TODO: Promise化
export const observeAddingHTMLElement = ({
  target,
  options,
  find,
  callback
}: {
  target: Node
  options: MutationObserverInit
  find: HTMLElementFinder
  callback: (element: HTMLElement) => void
}): void => {
  const observer = new MutationObserver((mutations, observer) => {
    const element = find(mutations)

    if (element !== undefined) {
      // NOTE: コストが高いので先に止める
      observer.disconnect()
      callback(element)
    }
  })
  observer.observe(target, options)
}
