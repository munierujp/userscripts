import { closeVideoInfoDialog } from './closeVideoInfoDialog'
import { findFilePath } from './findFilePath'
import { findVideoInfoDialogStyleElement } from './findVideoInfoDialogStyleElement'
import { openVideoInfoDialog } from './openVideoInfoDialog'

export const fetchFilePath = async (): Promise<string> => {
  const desktop = document.getElementById('sds-desktop')

  if (desktop === null) {
    throw new Error('Missing desktop element.')
  }

  const videoInfoDialogStyle = findVideoInfoDialogStyleElement()

  if (videoInfoDialogStyle === undefined) {
    throw new Error('Missing video info dialog style element.')
  }

  return await new Promise(resolve => {
    const observer = new MutationObserver((mutations, observer) => {
      const videoInfoDialog = mutations
        .flatMap(({ addedNodes }) => Array.from(addedNodes).filter((node): node is HTMLElement => node instanceof HTMLElement))
        .find(({ classList }) => classList.contains('video-info-dialog'))

      if (videoInfoDialog === undefined) {
        return
      }

      // NOTE: コストが高いので目的の要素が追加されたらすぐに止める
      observer.disconnect()
      const filePath = findFilePath(videoInfoDialog)

      if (filePath === undefined) {
        throw new Error('Missing file path.')
      }

      closeVideoInfoDialog(videoInfoDialog)
      resolve(filePath)
    })
    observer.observe(desktop, {
      childList: true
    })
    openVideoInfoDialog()
  })
}
