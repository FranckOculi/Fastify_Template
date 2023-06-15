import { findById } from '../../../repositories/userRepository'
import { findById as findTeamById } from '../../../repositories/teamRepository'
import { ServiceResponse } from '../../../types/service'
import { User } from '../../../types/user'
import { Team } from '../../../types/team'

export const getMeService = async (
	id: number
): Promise<ServiceResponse<{ user: Partial<User>; team: Partial<Team> }>> => {
	const user = await findById(id)

	if (!user)
		return { error: "This user doesn't exist", status: 404, data: null }

	const team = await findTeamById(user.teamId)

	return {
		error: null,
		status: null,
		data: {
			user,
			team,
		},
	}
}
