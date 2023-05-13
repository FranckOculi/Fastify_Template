import configuration from './src/config/configuration.js'

export default {
	client: 'sqlite3',
	connection: {
		filename: configuration?.sqlite_path,
	},
	useNullAsDefault: true,
	migrations: {
		directory: './src/database/migrations',
	},
	seeds: {
		directory: './src/database/seeds',
	},
}
