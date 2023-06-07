import {
	createTeam,
	findByName,
	removeTeam,
} from '../../repositories/teamRepository'
import { createTeamService } from './teamService'
import { Team } from '../../types/team'

describe('createTeamService', () => {
	const newTeam = {
		name: 'Team Test',
		description: 'test',
	} as Team
	const newTeamError = {
		name: 'Team Test',
		description: 'test',
	} as Team

	let errorTeamId: number

	beforeAll(async () => {
		const teamError = await findByName(newTeamError.name)

		if (!teamError) {
			newTeamError.updatedAt = new Date()

			const newTeam = await createTeam(newTeamError)
			errorTeamId = newTeam.id as number
		}
	})

	beforeEach(async () => {
		const team = <Team>await findByName(newTeam.name)

		if (team) await removeTeam(team.id)
	})

	afterEach(async () => {
		const team = <Team>await findByName(newTeam.name)

		if (team) await removeTeam(team.id)
	})

	afterAll(async () => {
		const teamError = <Team>await findByName(newTeamError.name)

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
