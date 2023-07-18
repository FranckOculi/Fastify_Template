import { FastifyInstance } from 'fastify'
import { login_microsoft } from '../controllers/oauthController'

async function oauthRoutes(fastify: FastifyInstance) {
	fastify.route({
		method: 'POST',
		url: '/login/microsoft',
		handler: login_microsoft,
	})

	fastify.route<{
		Params: { code: string }
	}>({
		method: 'POST',
		url: '/login/microsoft/callback',
		handler: login_microsoft,
	})
}

export default oauthRoutes
