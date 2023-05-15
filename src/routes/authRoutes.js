import { signUpUserSchema, loginUserSchema } from '../schemas/authSchema.js'
import { signUp, login, refresh } from '../controllers/authController.js'

async function authRoutes(fastify, options, done) {
	fastify.route({
		method: 'POST',
		url: '/register',
		schema: signUpUserSchema,
		handler: signUp,
	})

	fastify.route({
		method: 'POST',
		url: '/login',
		schema: loginUserSchema,
		handler: login,
	})

	fastify.route({
		method: 'GET',
		url: '/refresh',
		handler: refresh,
	})
}

export default authRoutes
