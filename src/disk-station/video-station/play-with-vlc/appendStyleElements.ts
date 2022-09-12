import { appendStyleElement } from './appendStyleElement'

const ID_DROPDOWN_MENU_STYLE = 'jp-munieru-style-dropdown-menu'
const ID_VIDEO_INFO_DIALOG_STYLE = 'jp-munieru-style-video-info-dialog'

export const appendStyleElements = (): void => {
  appendStyleElement(ID_DROPDOWN_MENU_STYLE)
  appendStyleElement(ID_VIDEO_INFO_DIALOG_STYLE)
}
