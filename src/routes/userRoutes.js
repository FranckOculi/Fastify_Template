import {
	getSingleUser,
	getAllUsers,
	deleteUser,
	updateUser,
	getMe,
} from '../controllers/userController.js'
import {
	getUserSchema,
	deleteUserSchema,
	updateUserSchema,
} from '../schemas/userSchema.js'
import { tokenVerification } from '../middlewares/authenticationMiddleware.js'
import { permissionVerification } from '../middlewares/permissionMiddleware.js'

async function userRoutes(fastify, options, done) {
	fastify.route({
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

	fastify.route({
		method: 'PUT',
		url: '/update/:id',
		schema: updateUserSchema,
		preValidation: tokenVerification,
		preHandler: permissionVerification,
		handler: updateUser,
	})

	fastify.route({
		method: 'DELETE',
		url: '/delete/:id',
		schema: deleteUserSchema,
		preValidation: tokenVerification,
		preHandler: permissionVerification,
		handler: deleteUser,
	})

	fastify.route({
		method: 'GET',
		url: '/me/:id',
		schema: getUserSchema,
		preValidation: tokenVerification,
		preHandler: permissionVerification,
		handler: getMe,
	})
}
export default userRoutes
