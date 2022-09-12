export const ViewType = {
  LIST: 'list',
  TABLE: 'table'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ViewType = typeof ViewType[keyof typeof ViewType]
const values = Object.values(ViewType)
export const isViewType = (value: any): value is ViewType => values.includes(value)
