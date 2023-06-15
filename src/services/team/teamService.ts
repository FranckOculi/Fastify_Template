import { createTeam } from '../../repositories/teamRepository'
import { ServiceResponse } from '../../types/service'
import { Team } from '../../types/team'

export const createTeamService = async (
	data: Partial<Team>
): Promise<ServiceResponse<Partial<Team>>> => {
	data.createdAt = new Date()
	data.updatedAt = new Date()

	const response = await createTeam(data)

	return { error: null, status: null, data: response }
}
