import { handleOpenedFromAmazon } from './handleOpenedFromAmazon'
import { isOpenedFromAmazon } from './isOpenedFromAmazon'

/**
 * ブクログの処理を実行します。
 */
export const handleBooklog = (): void => {
  const opener: Window | null = window.opener

  if (opener !== null && isOpenedFromAmazon()) {
    handleOpenedFromAmazon()
  }
}
