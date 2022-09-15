import { DropdownMenuStyle } from './DropdownMenuStyle'
import { isVideoStationPage } from './isVideoStationPage'
import { updatePlayButton } from './updatePlayButton'

if (isVideoStationPage(new URL(location.href))) {
  DropdownMenuStyle.create()
  updatePlayButton()
}
