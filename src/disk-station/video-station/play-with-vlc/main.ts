import { isVideoStationPage } from '../../util'
import { handleVideoStation } from './handleVideoStation'

if (isVideoStationPage(new URL(location.href))) {
  handleVideoStation()
}
