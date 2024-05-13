import { isVideoStationPage } from '../../util/isVideoStationPage.js'
import { handleVideoStation } from './handleVideoStation.js'

if (isVideoStationPage(new URL(location.href))) {
  handleVideoStation()
}
