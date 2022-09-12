// TODO: サムネイル上の小さい再生ボタンも書き換える

import { appendStyleElements } from './appendStyleElements'
import { isVideoStationPage } from './isVideoStationPage'
import { updatePlayButton } from './updatePlayButton'

if (isVideoStationPage()) {
  appendStyleElements()
  updatePlayButton()
}
