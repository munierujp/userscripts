/**
 * URLからASINを抽出します。
 * @param url - URL
 * @returns ASIN
 */
export const extractAsin = (url: string): string | undefined => {
  return url.match(/^https?:\/\/www\.amazon\.co\.jp\/(gp\/product|(([^/]+)\/)?dp)\/([^/?]+)([/?].+)?/)?.[4]
}
