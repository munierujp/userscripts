/**
 * URLからASINを抽出します。
 * @param url - URL
 * @returns ASIN
 */
export const extractAsin = (url: URL): string | undefined => {
  return url.searchParams.get('asin') ?? undefined
}
