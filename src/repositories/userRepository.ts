import Repository from '../utils/Repository'
import { User } from '../types/user'
import { Params } from 'src/types/repository'

const repository = new Repository('users')
const userSafeFields = [
	'id',
	'teamId',
	'displayName',
	'email',
	'phone',
	'access',
	'imageUrl',
	'updatedAt',
	'createdAt',
]

export const findAllByQuery = async (
	query: Params
): Promise<Partial<User[]>> => {
	return repository.findAll(query)
}

export const findById = async (
	id: number,
	fields: string[] = null
): Promise<Partial<User>> => {
	return repository.findOne<Promise<Partial<User>>>({
		where: { id },
		select: fields || userSafeFields,
	})
}

export const findByEmail = async (
	email: string,
	fields: string[] = null
): Promise<Partial<User>> => {
	return repository.findOne<Promise<User>>({
		where: { email },
		select: fields || userSafeFields,
	})
}

export const updateUser = async (
	query: Params['where'],
	data: Partial<User>
): Promise<number> => {
	return repository.update(query, data)
}

export const createUser = async (
	data: Partial<User>
): Promise<Partial<User>> => {
	data.createdAt = new Date()

	const response = await repository.create(data)
	return findById(response[0])
}

export const removeUser = async (id: number) => {
	return repository.remove({
		where: { id },
		select: userSafeFields,
	})
}
