import type { Knex } from 'knex'
const databasePath = '.db.sqlite'

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: databasePath,
		},
		useNullAsDefault: true,
		migrations: {
			directory: 'src/database/migrations',
		},
		seeds: {
			directory: 'src/database/seeds',
		},
	},
}

export default config
