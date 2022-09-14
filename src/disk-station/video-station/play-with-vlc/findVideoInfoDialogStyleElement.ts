import { ID } from './ID'

export const findVideoInfoDialogStyleElement = (): HTMLStyleElement | undefined => {
  const element = document.getElementById(ID.VIDEO_INFO_DIALOG)
  return element instanceof HTMLStyleElement ? element : undefined
}
