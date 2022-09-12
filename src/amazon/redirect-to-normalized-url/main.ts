import { extractAsin } from './extractAsin'

const url = location.href
const asin = extractAsin(url)

if (asin !== undefined) {
  const normalizedUrl = `https://www.amazon.co.jp/dp/${asin}`

  if (normalizedUrl !== url) {
    location.href = normalizedUrl
  }
}
