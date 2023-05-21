import { createTeamService } from './teamService'

describe('createTeamService', () => {
	const newTeam = {
		name: 'Team Test',
		description: 'test',
	}
	const newTeamError = {
		id: 2,
		name: 'Team Test',
		description: 'test',
	}

	it('should return an error when team already exist', async () => {
		const { error, status, data } = await createTeamService(newTeamError)

		expect(error).toBeDefined()
	})
	it('should succeed', async () => {
		const { error, status, data } = await createTeamService(newTeam)

		expect(data.name).toBe(newTeam.name)
	})
})
