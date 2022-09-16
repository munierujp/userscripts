export const FilterType = {
  All: 'all',
  Discounted: 'discounted'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type FilterType = typeof FilterType[keyof typeof FilterType]
const values = Object.values(FilterType)
export const isFilterType = (value: any): value is FilterType => values.includes(value)
