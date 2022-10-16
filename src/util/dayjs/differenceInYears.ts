import dayjs from 'dayjs'
import type { DateLike } from './DateLike'

export const differenceInYears = (date1: DateLike, date2: DateLike): number => {
  return dayjs(date1).diff(date2, 'year')
}
