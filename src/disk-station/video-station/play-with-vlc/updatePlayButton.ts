import { createPlayWithVlcButton } from './createPlayWithVlcButton'
import { findPlayButtonElement } from './findPlayButtonElement'
import { observeAddingHTMLElement } from './observeAddingHTMLElement'
import { replaceElement } from './replaceElement'

export const updatePlayButton = (): void => {
  observeAddingHTMLElement({
    target: document.body,
    options: {
      childList: true,
      subtree: true
    },
    find: findPlayButtonElement,
    callback: (playButton) => {
      const playWithVlcButton = createPlayWithVlcButton(playButton)
      replaceElement(playButton, playWithVlcButton)
    }
  })
}
