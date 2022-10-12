/**
 * パスからASINを抽出します。
 * @param path - パス
 * @returns ASIN
 */
export const extractAsin = (path: string): string | undefined => {
  return path.match(/^\/(gp\/product|(([^/]+)\/)?dp)\/([^/?]+)([/?].+)?/)?.[4]
}
