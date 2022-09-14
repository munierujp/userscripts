// TODO: サムネイル上の小さい再生ボタンも書き換える

import { createStyleElement } from './createStyleElement'
import { isVideoStationPage } from './isVideoStationPage'
import { updatePlayButton } from './updatePlayButton'

if (isVideoStationPage(new URL(location.href))) {
  const dropdownMenuStyle = createStyleElement('jp-munieru-style-dropdown-menu')
  document.head.append(dropdownMenuStyle)
  const videoInfoDialogStyle = createStyleElement('jp-munieru-style-video-info-dialog')
  document.head.append(videoInfoDialogStyle)
  updatePlayButton()
}
