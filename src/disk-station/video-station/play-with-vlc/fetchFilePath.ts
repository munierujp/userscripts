import { findDesktopElement } from './findDesktopElement'
import { MediaInfoDialogElement } from './MediaInfoDialogElement'

export const fetchFilePath = async (): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const desktopElement = findDesktopElement()

    if (desktopElement === undefined) {
      throw new Error('Missing desktop element.')
    }

    const observer = new MutationObserver((mutations, observer) => {
      const mediaInfoDialogElement = MediaInfoDialogElement.fromMutations(mutations)

      if (mediaInfoDialogElement === undefined) {
        return
      }

      // NOTE: DOMを監視するコストが高いので、目的の要素が追加されたらすぐに止める
      observer.disconnect()
      const path = mediaInfoDialogElement.findFilePath()
      mediaInfoDialogElement.close()

      if (path !== undefined) {
        resolve(path)
      } else {
        reject(new Error('Missing file path.'))
      }
    })
    observer.observe(desktopElement, {
      childList: true
    })
    MediaInfoDialogElement.open()
  })
}
