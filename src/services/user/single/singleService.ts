import { User } from 'src/types/User'
import {
	findById,
	removeUser,
	updateUser,
} from '../../../repositories/userRepository'
import { ServiceResponse } from 'src/types/Service'

export const getUserService = async (
	id: number
): Promise<ServiceResponse<Partial<User>>> => {
	const user = await findById(id)

	if (!user)
		return { error: "This user doesn't exist", status: 404, data: null }

	return { error: null, status: null, data: user }
}

export const updateUserService = async (
	id: number,
	data: Partial<User>
): Promise<ServiceResponse<Partial<User>>> => {
	const user = await findById(id)

	if (!user)
		return { error: "This user doesn't exist", status: 404, data: null }

	data.updatedAt = new Date()
	await updateUser({ id }, data)

	const newUser = await findById(id)

	return { error: null, status: null, data: newUser }
}

export const deleteUserService = async (
	id: number
): Promise<ServiceResponse<Partial<User>>> => {
	const user = await findById(id)

	if (!user)
		return { error: "This user doesn't exist", status: 404, data: null }

	await removeUser(id)

	return { error: null, status: null, data: null }
}
