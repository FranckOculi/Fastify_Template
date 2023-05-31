import { FastifyReply, FastifyRequest } from 'fastify'
import { fetchAll } from '../services/user/multiple/multipleService'
import {
	deleteUserService,
	getUserService,
	updateUserService,
} from '../services/user/single/singleService'
import { getMeService } from '../services/user/me/meService'
import { User } from 'src/types/User'

export const getSingleUser = async (
	req: FastifyRequest<{
		Params: { id: number }
	}>,
	res: FastifyReply
) => {
	const { error, status, data } = await getUserService(req.params.id)

	if (error) return res.code(status).send({ message: error })

	return res.code(200).send({
		message: 'User data',
		data,
	})
}

export const getAllUsers = async (req: FastifyRequest, res: FastifyReply) => {
	const { error, status, data } = await fetchAll()

	return res.code(200).send({
		message: 'All users',
		data,
	})
}

export const updateUser = async (
	req: FastifyRequest<{
		Body: Partial<User>
		Params: { id: number }
	}>,
	res: FastifyReply
) => {
	const { error, status, data } = await updateUserService(req.params.id, {
		teamId: req.body.teamId,
		displayName: req.body.displayName,
		email: req.body.email,
		password: req.body.password,
		access: req.body.access,
		phone: req.body.phone,
	})

	if (error) return res.code(status).send({ message: error })

	return res.code(201).send({
		message: 'User updated !',
		data,
	})
}

export const deleteUser = async (
	req: FastifyRequest<{
		Params: { id: number }
	}>,
	res: FastifyReply
) => {
	const { error, status, data } = await deleteUserService(req.params.id)

	if (error) return res.code(status).send({ message: error })

	return res.code(200).send({ message: 'User deleted !' })
}

export const getMe = async (
	req: FastifyRequest<{
		Params: { id: number }
	}>,
	res: FastifyReply
) => {
	const { error, status, data } = await getMeService(req.params.id)

	if (error) return res.code(status).send({ message: error })

	return res.code(200).send({
		message: 'me',
		data,
	})
}
