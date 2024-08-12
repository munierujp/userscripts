import Dexie from 'dexie'
import type { Table } from 'dexie'
import type { Restaurant } from './models/Restaurant.js'

const DexieClass = Dexie as unknown as typeof Dexie['default']

export class Database extends DexieClass {
  restaurants!: Table<Restaurant>

  constructor () {
    super('munierujp-tabelog-blocker')
    this.version(1).stores({
      restaurants: 'id'
    })
  }
}
