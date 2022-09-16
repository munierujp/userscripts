import { findDesktop } from './findDesktop'
import { MediaInfoDialog } from './MediaInfoDialog'

export const fetchFilePath = async (): Promise<string> => {
  return await new Promise((resolve, reject) => {
    const desktop = findDesktop()

    if (desktop === undefined) {
      throw new Error('Missing desktop.')
    }

    const observer = new MutationObserver((mutations, observer) => {
      const mediaInfoDialog = MediaInfoDialog.fromMutations(mutations)

      if (mediaInfoDialog === undefined) {
        return
      }

      // NOTE: DOMを監視するコストが高いので、目的の要素が追加されたらすぐに止める
      observer.disconnect()
      const path = mediaInfoDialog.findFilePath()
      mediaInfoDialog.close()

      if (path !== undefined) {
        resolve(path)
      } else {
        reject(new Error('Missing file path.'))
      }
    })
    observer.observe(desktop, {
      childList: true
    })
    MediaInfoDialog.open()
  })
}
