import { isVideoStationPage } from '../../lib/isVideoStationPage'
import { handleVideoStation } from './handleVideoStation'

if (isVideoStationPage(new URL(location.href))) {
  handleVideoStation()
}
