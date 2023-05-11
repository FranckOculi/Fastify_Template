import { createTeam } from "../../repositories/teamRepository.js"

export const createTeamService = async (data) => {
	data.createdAt = Date.now()
	data.updatedAt = Date.now()

	const response = await createTeam(data)

	if (response) return { error: null, data: response }
	return { error: response }
}
