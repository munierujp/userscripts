export const createUrl = (filePath: string): string => {
  return encodeURI(`vlc:///Volumes${filePath}`)
}
