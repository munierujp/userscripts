import { cloneNode } from '../../../lib/cloneNode'
import { createUrl } from './createUrl'
import { fetchFilePath } from './fetchFilePath'

const onClickButton = async (): Promise<void> => {
  const filePath = await fetchFilePath()
  const url = createUrl(filePath)
  window.open(url)
}

export const createPlayWithVlcButton = <T extends Node>(playButton: T): T => {
  const playWithVlcButton = cloneNode(playButton)
  playWithVlcButton.addEventListener('click', () => {
    onClickButton().catch(error => {
      throw error
    })
  })
  return playWithVlcButton
}
