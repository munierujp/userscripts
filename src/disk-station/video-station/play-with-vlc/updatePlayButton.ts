import { createPlayWithVlcButton } from './createPlayWithVlcButton'

export const updatePlayButton = (): void => {
  const observer = new MutationObserver((mutations, observer) => {
    const playButton = mutations
      .flatMap(({ addedNodes }) => Array.from(addedNodes).filter((node): node is HTMLElement => node instanceof HTMLElement))
      .find(({ classList }) => classList.contains('x-btn') && classList.contains('play'))

    if (playButton === undefined) {
      return
    }

    // NOTE: コストが高いので目的の要素が追加されたらすぐに止める
    observer.disconnect()
    const playWithVlcButton = createPlayWithVlcButton(playButton)
    playButton.style.display = 'none'
    playButton.before(playWithVlcButton)
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}
