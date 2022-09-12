export const findVideoInfoDialogStyleElement = (): HTMLStyleElement | undefined => {
  const element = document.getElementById('jp-munieru-style-video-info-dialog')
  return element instanceof HTMLStyleElement ? element : undefined
}
