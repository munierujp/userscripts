export const isVideoStationPage = (): boolean => {
  const params = new URLSearchParams(location.search)
  const appId = params.get('launchApp')
  return appId === 'SYNO.SDS.VideoStation.AppInstance'
}
