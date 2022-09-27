import {
  describe,
  expect,
  it
} from '@jest/globals'
import { isVideoStationPage } from './isVideoStationPage'

describe('isVideoStationPage', () => {
  it('returns true if `launchApp` parameter is `SYNO.SDS.VideoStation.AppInstance`', () => {
    const url = new URL('https://example.com/?launchApp=SYNO.SDS.VideoStation.AppInstance')

    const actual = isVideoStationPage(url)

    expect(actual).toBe(true)
  })

  it('returns false if `launchApp` parameter is not `SYNO.SDS.VideoStation.AppInstance`', () => {
    const url = new URL('https://example.com/')

    const actual = isVideoStationPage(url)

    expect(actual).toBe(false)
  })
})
