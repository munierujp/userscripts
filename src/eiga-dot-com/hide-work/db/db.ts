import Dexie from 'dexie'
import type { Table } from 'dexie'
import type { Movie } from './models/Movie.js'

const DexieClass = Dexie as unknown as typeof Dexie['default']

export class Database extends DexieClass {
  movies!: Table<Movie>

  constructor () {
    super('munierujp-eiga-dot-com-hide-work')
    this.version(1).stores({
      movies: 'id'
    })
  }
}

export const database = new Database()
