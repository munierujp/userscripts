export const ID = {
  DROPDOWN_MENU_STYLE: 'jp-munieru-style-dropdown-menu',
  VIDEO_INFO_DIALOG: 'jp-munieru-style-video-info-dialog'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ID = typeof ID[keyof typeof ID]
