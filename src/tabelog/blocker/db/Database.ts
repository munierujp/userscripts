import Dexie from 'dexie'
import type { Table } from 'dexie'
import type { Restaurant } from './models'

export class Database extends Dexie {
  restaurants!: Table<Restaurant>

  constructor () {
    super('munierujp-tabelog-blocker')
    this.version(1).stores({
      restaurants: 'url'
    })
  }
}
