import Dexie from 'dexie'
import type { Table } from 'dexie'
import type { Movie } from './model/Movie.js'

const DexieClass = Dexie as unknown as typeof Dexie['default']

class Database extends DexieClass {
  movies!: Table<Movie>

  constructor () {
    super('munierujp-eiga-dot-com-hide-movie')
    this.version(1).stores({
      movies: 'id'
    })
  }
}

export const db = new Database()
