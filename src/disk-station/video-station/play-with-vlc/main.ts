// TODO: サムネイル上の小さい再生ボタンも書き換える

import { appendStyleElement } from './appendStyleElement'
import { isVideoStationPage } from './isVideoStationPage'
import { updatePlayButton } from './updatePlayButton'

const ID_DROPDOWN_MENU_STYLE = 'jp-munieru-style-dropdown-menu'
const ID_VIDEO_INFO_DIALOG_STYLE = 'jp-munieru-style-video-info-dialog'

if (isVideoStationPage(new URL(location.href))) {
  appendStyleElement(ID_DROPDOWN_MENU_STYLE)
  appendStyleElement(ID_VIDEO_INFO_DIALOG_STYLE)
  updatePlayButton()
}
