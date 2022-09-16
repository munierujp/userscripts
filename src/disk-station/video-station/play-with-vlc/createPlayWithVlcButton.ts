import { cloneNode } from '../../../lib/cloneNode'
import { createUrl } from './createUrl'
import { fetchFilePath } from './fetchFilePath'
import { handleError } from './handleError'

const handleClick = async (): Promise<void> => {
  const filePath = await fetchFilePath()
  const url = createUrl(filePath)
  window.open(url)
}

export const createPlayWithVlcButton = <T extends Node>(playButton: T): T => {
  const button = cloneNode(playButton)
  button.addEventListener('click', () => {
    handleClick().catch(handleError)
  })
  return button
}
