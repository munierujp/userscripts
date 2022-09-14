import { closeVideoInfoDialog } from './closeVideoInfoDialog'
import { findFilePath } from './findFilePath'
import { findVideoInfoDialogElement } from './findVideoInfoDialogElement'
import { findVideoInfoDialogStyleElement } from './findVideoInfoDialogStyleElement'
import { hideVideoInfoDialog } from './hideVideoInfoDialog'
import { observeAddingHTMLElement } from './observeAddingHTMLElement'
import { openVideoInfoDialog } from './openVideoInfoDialog'
import { showVideoInfoDialog } from './showVideoInfoDialog'

export const fetchFilePath = async (): Promise<string> => {
  return await new Promise(resolve => {
    const target = document.getElementById('sds-desktop')

    if (target === null) {
      throw new Error('Missing target element.')
    }

    const videoInfoDialogStyle = findVideoInfoDialogStyleElement()

    if (videoInfoDialogStyle === undefined) {
      throw new Error('Missing video info dialog style element.')
    }

    observeAddingHTMLElement({
      target,
      options: {
        childList: true
      },
      find: findVideoInfoDialogElement,
      callback: (dialog) => {
        const filePath = findFilePath(dialog)

        if (filePath === undefined) {
          throw new Error('Missing file path.')
        }

        closeVideoInfoDialog(dialog)
        showVideoInfoDialog(videoInfoDialogStyle)
        resolve(filePath)
      }
    })
    hideVideoInfoDialog(videoInfoDialogStyle)
    openVideoInfoDialog()
  })
}
