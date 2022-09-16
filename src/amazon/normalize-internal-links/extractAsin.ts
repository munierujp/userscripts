export const extractAsin = (path: string): string | undefined => {
  return path.match(/^\/(gp\/product|(([^/]+)\/)?dp)\/([^/?]+)([/?].+)?/)?.[4]
}
