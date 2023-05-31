import fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'

import configuration from './src/config/configuration'
import authRoutes from './src/routes/authRoutes'
import userRoutes from './src/routes/userRoutes'

const app = fastify({
	logger: configuration.env === 'test' ? false : true,
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

export default app
