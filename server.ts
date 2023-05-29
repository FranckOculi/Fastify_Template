import App from './app'
import configuration from './src/config/configuration.js'

// Run the server!
const start = async () => {
	try {
		await App.listen({ port: configuration.server_port })
	} catch (err) {
		App.log.error(err)
		process.exit(1)
	}
}
start()
