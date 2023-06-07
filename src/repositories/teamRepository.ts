import Repository from '../utils/Repository'
import { Team } from '../types/team'

const respository = new Repository('teams')
const teamSafeFields = ['id', 'name', 'description', 'updatedAt', 'createdAt']

export const findAll = async (): Promise<Partial<Team[]>> => {
	return respository.findAll({ select: teamSafeFields })
}

export const findById = async (id: number): Promise<Partial<Team>> => {
	return respository.findOne({ where: { id }, select: teamSafeFields })
}

export const findByName = async (name: string): Promise<Partial<Team>> => {
	return respository.findOne({
		where: { name },
		select: teamSafeFields,
	})
}

export const createTeam = async (
	data: Partial<Team>
): Promise<Partial<Team>> => {
	data.createdAt = new Date()

	const response = await respository.create(data)
	return findById(response[0])
}

export const removeTeam = async (id: number): Promise<number> => {
	return respository.remove({ where: { id }, select: teamSafeFields })
}
