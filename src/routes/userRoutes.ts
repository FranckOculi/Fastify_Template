import { FastifyInstance } from 'fastify'
import {
	getSingleUser,
	getAllUsers,
	deleteUser,
	updateUser,
	getMe,
} from '../controllers/userController'
import {
	getUserSchema,
	deleteUserSchema,
	updateUserSchema,
} from '../schemas/userSchema'
import { tokenVerification } from '../middlewares/authenticationMiddleware'
import { permissionVerification } from '../middlewares/permissionMiddleware'
import { User } from 'src/types/User'

async function userRoutes(fastify: FastifyInstance) {
	fastify.route<{
		Params: { id: number }
	}>({
		method: 'GET',
		url: '/:id',
		schema: getUserSchema,
		preValidation: tokenVerification,
		preHandler: permissionVerification,
		handler: getSingleUser,
	})

	fastify.route({
		method: 'GET',
		url: '/all',
		preValidation: tokenVerification,
		handler: getAllUsers,
	})

	fastify.route<{
		Body: Partial<User>
		Params: { id: number }
	}>({
		method: 'PUT',
		url: '/update/:id',
		schema: updateUserSchema,
		preValidation: tokenVerification,
		preHandler: permissionVerification,
		handler: updateUser,
	})

	fastify.route<{
		Params: { id: number }
	}>({
		method: 'DELETE',
		url: '/delete/:id',
		schema: deleteUserSchema,
		preValidation: tokenVerification,
		preHandler: permissionVerification,
		handler: deleteUser,
	})

	fastify.route<{
		Params: { id: number }
	}>({
		method: 'GET',
		url: '/me/:id',
		schema: getUserSchema,
		preValidation: tokenVerification,
		preHandler: permissionVerification,
		handler: getMe,
	})
}
export default userRoutes
