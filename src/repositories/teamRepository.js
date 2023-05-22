import Repository from '../utils/Repository.js'

const respository = new Repository('teams')
const teamSafeFields = ['id', 'name', 'description', 'updatedAt', 'createdAt']

export const findAll = async () => {
	return respository.findAll({ select: teamSafeFields })
}

export const findById = async (id) => {
	return respository.findOne({ where: { id }, select: teamSafeFields })
}

export const findByName = async (name) => {
	return respository.findOne({
		where: { name },
		select: teamSafeFields,
	})
}

export const createTeam = async (data) => {
	data.createdAt = Date.now()

	const response = await respository.create(data)
	return findById(response[0])
}

export const removeTeam = async (id) => {
	return respository.remove({ where: { id }, select: teamSafeFields })
}
