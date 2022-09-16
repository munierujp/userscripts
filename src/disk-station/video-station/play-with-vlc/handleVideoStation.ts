import { isHTMLElement } from '../../../lib/isHTMLElement'
import { createPlayWithVlcButton } from './createPlayWithVlcButton'
import { isPlayButton } from './isPlayButton'

export const handleVideoStation = (): void => {
  const observer = new MutationObserver((mutations, observer) => {
    const playButton = mutations
      // eslint-disable-next-line unicorn/no-array-callback-reference
      .flatMap(({ addedNodes }) => Array.from(addedNodes).filter(isHTMLElement))
      .find(element => isPlayButton(element))

    if (playButton === undefined) {
      return
    }

    // NOTE: DOMを監視するコストが高いので、目的の要素が追加されたらすぐに止める
    observer.disconnect()
    const playWithVlcButton = createPlayWithVlcButton(playButton)
    playButton.style.display = 'none'
    playButton.after(playWithVlcButton)
  })
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
}
