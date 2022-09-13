import { createUrl } from './createUrl'

describe('createUrl', () => {
  it('returns URL', () => {
    const filePath = '/video/Home Video/example.mov'
    const actual = createUrl(filePath)

    expect(actual).toBe('vlc:///Volumes/video/Home%20Video/example.mov')
  })
})
