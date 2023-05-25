import {
	createTeam,
	findById,
	findByName,
	removeTeam,
} from '../../repositories/teamRepository'
import { createTeamService } from './teamService'

describe('createTeamService', () => {
	const newTeam = {
		name: 'Team Test',
		description: 'test',
	}
	const newTeamError = {
		name: 'Team Test',
		description: 'test',
	}

	let errorTeamId

	beforeAll(async () => {
		const teamError = await findByName(newTeamError.name)

		if (!teamError) {
			newTeamError.createdAt = Date.now()
			newTeamError.updatedAt = Date.now()

			const newTeam = await createTeam(newTeamError)
			errorTeamId = newTeam.id
		}
	})

	beforeEach(async () => {
		const team = await findByName(newTeam.name)

		if (team) await removeTeam(team.id)
	})

	afterEach(async () => {
		const team = await findByName(newTeam.name)

		if (team) await removeTeam(team.id)
	})

	afterAll(async () => {
		const teamError = await findByName(newTeamError.name)

		if (teamError) await removeTeam(newTeamError.id)
	})

	it('should return an error when team already exist', async () => {
		const { error, status, data } = await createTeamService(newTeamError)

		expect(error).toBeDefined()
	})

	it('should succeed', async () => {
		const { error, status, data } = await createTeamService(newTeam)

		expect(data.name).toBe(newTeam.name)
	})
})
