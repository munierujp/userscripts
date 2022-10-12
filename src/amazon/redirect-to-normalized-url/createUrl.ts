/**
 * ASINをもとに商品ページのURLを作成します。
 * @param asin - ASIN
 * @returns URL
 */
export const createUrl = (asin: string): string => {
  return `https://www.amazon.co.jp/dp/${asin}`
}
