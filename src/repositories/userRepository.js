import Repository from '../utils/Repository.js'

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

export const findAllByQuery = async (query) => {
	return repository.findAll(query)
}

export const findById = async (id, fields = null) => {
	return repository.findOne({ where: { id }, select: fields || userSafeFields })
}

export const findByEmail = async (email, fields = null) => {
	return repository.findOne({
		where: { email },
		select: fields || userSafeFields,
	})
}

export const updateUser = async (query, data) => {
	return repository.update(query, data)
}

export const createUser = async (data) => {
	data.createdAt = Date.now()

	const response = await repository.create(data)
	return findById(response[0])
}

export const updateUserPassword = async (id, password, active = false) => {
	const payload = { password }
	if (active) payload.active = 1

	return repository.update({ id }, payload)
}

export const removeUser = async (params) => {
	return repository.remove(params)
}
