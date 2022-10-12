/**
 * URLがVideo Stationかどうかを返します。
 * @param url - URL
 * @returns URLがVideo Stationかどうか
 */
export const isVideoStationPage = (url: URL): boolean => {
  return url.searchParams.get('launchApp') === 'SYNO.SDS.VideoStation.AppInstance'
}
