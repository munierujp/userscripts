import 'jsdom-global/register'
import assert from 'node:assert'
import {
  describe,
  it
} from 'node:test'
import { isAlertTextElement } from './isAlertTextElement'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe('isAlertTextElement', async () => {
  const { each } = await import('test-each')

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  describe('returns whether value is alert text element.', () => {
    const inputs: Array<[message: string, expected: boolean]> = [
      ['この記事は最終更新日から1年以上が経過しています。', true],
      ['この記事は最終更新日から10年以上が経過しています。', true],
      ['この記事は1年以内に更新されています。', false]
    ]
    each(inputs, ({ title }, [message, expected]) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      it(title, () => {
        const element = document.createElement('p')
        element.textContent = message
        const actual = isAlertTextElement(element)
        assert.strictEqual(actual, expected)
      })
    })
  })
})
