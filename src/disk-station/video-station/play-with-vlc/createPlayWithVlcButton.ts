import { createUrl } from './createUrl'
import { fetchFilePath } from './fetchFilePath'

export const createPlayWithVlcButton = (playButton: HTMLElement): HTMLElement => {
  const playWithVlcButton = playButton.cloneNode(true)

  if (!(playWithVlcButton instanceof HTMLElement)) {
    throw new TypeError('Failed to clone node.')
  }
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  playWithVlcButton.addEventListener('click', async () => {
    const filePath = await fetchFilePath()
    const url = createUrl(filePath)
    window.open(url)
  })
  return playWithVlcButton
}
