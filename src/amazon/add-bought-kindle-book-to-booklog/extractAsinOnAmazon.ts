export const extractAsinOnAmazon = (url: URL): string | null => {
  return url.searchParams.get('asin')
}
