export const EventType = {
  /** AmazonでKindle本を購入 */
  AMAZON_BOUGHT: 'amazon_bought',
  /** ブクログの準備が完了 */
  BOOKLOG_READY: 'booklog_ready'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type EventType = typeof EventType[keyof typeof EventType]
