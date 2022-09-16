import { findDesktop } from './findDesktop'
import { MediaInfoDialog } from './MediaInfoDialog'

export const fetchFilePath = async (): Promise<string> => {
  const desktop = findDesktop()

  if (desktop === undefined) {
    throw new Error('Missing desktop.')
  }

  return await new Promise((resolve, reject) => {
    const observer = new MutationObserver((mutations, observer) => {
      const mediaInfoDialog = MediaInfoDialog.findFromMutations(mutations)

      if (mediaInfoDialog === undefined) {
        return
      }

      // NOTE: コストが高いので目的の要素が追加されたらすぐに止める
      observer.disconnect()
      const filePath = mediaInfoDialog.findFilePath()
      mediaInfoDialog.close()

      if (filePath !== undefined) {
        resolve(filePath)
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
