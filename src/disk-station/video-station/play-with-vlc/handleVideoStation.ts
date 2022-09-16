import { PlayButton } from './PlayButton'

export const handleVideoStation = (): void => {
  const observer = new MutationObserver((mutations, observer) => {
    const playButton = PlayButton.fromMutations(mutations)

    if (playButton === undefined) {
      return
    }

    // NOTE: DOMを監視するコストが高いので、目的の要素が追加されたらすぐに止める
    observer.disconnect()
    playButton.replace()
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}
