export const isOpenedFromAmazon = (): boolean => {
  return document.referrer === 'https://www.amazon.co.jp/'
}
