import { handleOpenedFromAmazon } from './handleOpenedFromAmazon.js'
import { isOpenedFromAmazon } from './isOpenedFromAmazon.js'

/**
 * ブクログの処理を実行します。
 */
export const handleBooklog = (): void => {
  const opener: Window | null = window.opener

  if (opener !== null && isOpenedFromAmazon()) {
    handleOpenedFromAmazon()
  }
}
