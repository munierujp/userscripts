import { Dexie } from 'dexie'
import type { Table } from 'dexie'
import type { Movie } from './models/Movie.js'

const DB_NAME = 'munierujp-eiga-dot-com-hide-work'

export class Database extends Dexie {
  movies!: Table<Movie>

  constructor () {
    super(DB_NAME)
    this.version(1).stores({
      movies: 'id'
    })
  }
}
