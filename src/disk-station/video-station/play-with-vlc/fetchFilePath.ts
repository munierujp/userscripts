import { MediaInfoDialog } from './MediaInfoDialog'

export const fetchFilePath = async (): Promise<string> => {
  const desktop = document.getElementById('sds-desktop')

  if (desktop === null) {
    throw new Error('Missing desktop element.')
  }

  return await new Promise(resolve => {
    const observer = new MutationObserver((mutations, observer) => {
      const mediaInfoDialog = MediaInfoDialog.findFromMutations(mutations)

      if (mediaInfoDialog === undefined) {
        return
      }

      // NOTE: コストが高いので目的の要素が追加されたらすぐに止める
      observer.disconnect()
      const filePath = mediaInfoDialog.findFilePath()

      if (filePath === undefined) {
        throw new Error('Missing file path.')
      }

      mediaInfoDialog.close()
      resolve(filePath)
    })
    observer.observe(desktop, {
      childList: true
    })
    MediaInfoDialog.open()
  })
}
