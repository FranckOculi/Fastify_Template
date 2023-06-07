import { databasePath } from './const'

export default {
	client: 'sqlite3',
	connection: {
		filename: databasePath,
	},
	useNullAsDefault: true,
	migrations: {
		directory: '../migrations',
	},
	seeds: {
		directory: '../seeds',
	},
}
