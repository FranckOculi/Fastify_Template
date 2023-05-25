import { createTeam } from '../../repositories/teamRepository.js'

export const createTeamService = async (data) => {
	data.createdAt = Date.now()
	data.updatedAt = Date.now()

	const response = await createTeam(data)

	return { error: null, data: response }
}
