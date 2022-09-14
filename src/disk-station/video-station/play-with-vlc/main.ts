// TODO: リファクタリング
// TODO: サムネイル上の小さい再生ボタンも書き換える

import { DropdownMenuStyle } from './DropdownMenuStyle'
import { isVideoStationPage } from './isVideoStationPage'
import { updatePlayButton } from './updatePlayButton'

if (isVideoStationPage(new URL(location.href))) {
  DropdownMenuStyle.create()
  updatePlayButton()
}
