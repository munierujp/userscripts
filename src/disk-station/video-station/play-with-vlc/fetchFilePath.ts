import { VideoInfoDialog } from './VideoInfoDialog'

export const fetchFilePath = async (): Promise<string> => {
  const desktop = document.getElementById('sds-desktop')

  if (desktop === null) {
    throw new Error('Missing desktop element.')
  }

  return await new Promise(resolve => {
    const observer = new MutationObserver((mutations, observer) => {
      const videoInfoDialog = VideoInfoDialog.fromMutations(mutations)

      if (videoInfoDialog === undefined) {
        return
      }

      // NOTE: コストが高いので目的の要素が追加されたらすぐに止める
      observer.disconnect()
      const filePath = videoInfoDialog.findFilePath()

      if (filePath === undefined) {
        throw new Error('Missing file path.')
      }

      videoInfoDialog.close()
      resolve(filePath)
    })
    observer.observe(desktop, {
      childList: true
    })
    VideoInfoDialog.open()
  })
}
