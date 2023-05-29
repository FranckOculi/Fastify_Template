const databasePath = '../../../../.db.sqlite'

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
