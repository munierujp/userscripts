import assert from 'node:assert'
import {
  describe,
  it
} from 'node:test'
import { isArticle } from './Article'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe('isArticle', async () => {
  const { each } = await import('test-each')

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  describe('returns whether value is Article.', () => {
    const inputs: Array<[value: unknown, expected: boolean]> = [
      [
        {
          '@type': 'Article'
        },
        true
      ],
      [
        {
          '@type': 'Article',
          dateModified: '2020-05-08T16:46:28.000+09:00'
        },
        true
      ],
      [
        {},
        false
      ]
    ]
    each(inputs, ({ title }, [value, expected]) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      it(title, () => {
        const actual = isArticle(value)
        assert.strictEqual(actual, expected)
      })
    })
  })
})
