export const extractAsinOnAmazon = (url: URL): string | undefined => {
  return url.searchParams.get('asin') ?? undefined
}
