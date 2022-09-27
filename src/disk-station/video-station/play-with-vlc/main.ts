import { isVideoStationPage } from '../../lib'
import { handleVideoStation } from './handleVideoStation'

if (isVideoStationPage(new URL(location.href))) {
  handleVideoStation()
}
