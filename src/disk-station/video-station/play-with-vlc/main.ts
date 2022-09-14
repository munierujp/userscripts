// TODO: サムネイル上の小さい再生ボタンも書き換える

import { createStyleElement } from './createStyleElement'
import { ID } from './ID'
import { isVideoStationPage } from './isVideoStationPage'
import { updatePlayButton } from './updatePlayButton'

if (isVideoStationPage(new URL(location.href))) {
  const dropdownMenuStyle = createStyleElement(ID.DROPDOWN_MENU_STYLE)
  document.head.append(dropdownMenuStyle)
  const videoInfoDialogStyle = createStyleElement(ID.VIDEO_INFO_DIALOG)
  document.head.append(videoInfoDialogStyle)
  updatePlayButton()
}
