import { getMeService } from './meService'

describe('meService', () => {
	it('should return an error when no user', async () => {
		const id = 25
		const { error, status, data } = await getMeService(id)

		expect(status).toBe(404)
		expect(error).toBe("This user doesn't exist")
	})
	it('should succeed', async () => {
		const id = 2
		const { error, status, data } = await getMeService(id)

		expect(data.user.id).toBe(2)
		expect(data.team.id).toBe(2)
	})
})
