import assert from 'node:assert'
import {
  describe,
  it
} from 'node:test'
import { isVideoStationPage } from './isVideoStationPage'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe('isVideoStationPage', async () => {
  const { each } = await import('test-each')

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  describe('returns whether url is video station page', () => {
    const inputs: Array<[url: string, expected: boolean]> = [
      ['https://example.com/?launchApp=SYNO.SDS.VideoStation.AppInstance', true],
      ['https://example.com/', false]
    ]
    each(inputs, ({ title }, [url, expected]) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      it(title, () => {
        const actual = isVideoStationPage(new URL(url))
        assert.strictEqual(actual, expected)
      })
    })
  })
})
