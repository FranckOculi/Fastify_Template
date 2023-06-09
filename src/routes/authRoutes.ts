import { FastifyInstance } from 'fastify'
import { signUpUserSchema, loginUserSchema } from '../schemas/authSchema'
import { signUp, login, refresh } from '../controllers/authController'
import { User } from '../types/user'

async function authRoutes(fastify: FastifyInstance) {
	fastify.route<{
		Body: Partial<User>
	}>({
		method: 'POST',
		url: '/register',
		schema: signUpUserSchema,
		handler: signUp,
	})

	fastify.route<{
		Body: Partial<User>
	}>({
		method: 'POST',
		url: '/login',
		schema: loginUserSchema,
		handler: login,
	})

	fastify.route<{
		Headers: { cookies: { jwt: string } }
	}>({
		method: 'GET',
		url: '/refresh',
		handler: refresh,
	})
}

export default authRoutes
