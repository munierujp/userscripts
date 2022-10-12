import { PlayButtonElement } from './PlayButtonElement'

export const handleVideoStation = (): void => {
  const observer = new MutationObserver((mutations, observer) => {
    const playButtonElement = PlayButtonElement.fromMutations(mutations)

    if (playButtonElement === undefined) {
      return
    }

    // NOTE: DOMを監視するコストが高いので、目的の要素が追加されたらすぐに止める
    observer.disconnect()
    playButtonElement.replace()
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}
