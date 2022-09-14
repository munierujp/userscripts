import { createUrl } from './createUrl'
import { fetchFilePath } from './fetchFilePath'

const onClickButton = async (): Promise<void> => {
  const filePath = await fetchFilePath()
  const url = createUrl(filePath)
  window.open(url)
}

export const createPlayWithVlcButton = (playButton: HTMLElement): HTMLElement => {
  const playWithVlcButton = playButton.cloneNode(true)

  if (!(playWithVlcButton instanceof HTMLElement)) {
    throw new TypeError('Failed to clone node.')
  }

  playWithVlcButton.addEventListener('click', () => {
    onClickButton().catch(error => {
      throw error
    })
  })
  return playWithVlcButton
}
