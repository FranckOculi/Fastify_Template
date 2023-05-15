import fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'

import configuration from './src/config/configuration.js'
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'

const app = fastify({
	logger: true,
})

// cors
app.register(cors, {
	origin: true,
	// origin: configuration.app_url,
	// allowedHeaders: [
	//   'Origin',
	//   'X-Requested-With',
	//   'Accept',
	//   'Content-Type',
	//   'Authorization',
	// ],
	// methods: ['GET', 'PUT', 'POST', 'DELETE'],
})

// cookie
app.register(cookie, {
	secret: configuration.token_secret,
	hook: 'onRequest',
	parseOptions: {},
})

// Routes managers
app.register(authRoutes, { prefix: '/auth' })
app.register(userRoutes, { prefix: '/user' })

// Run the server!
const start = async () => {
	try {
		await app.listen({ port: configuration.server_port })
	} catch (err) {
		app.log.error(err)
		process.exit(1)
	}
}
start()
