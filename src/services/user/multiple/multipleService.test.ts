import { fetchAll } from './multipleService'

describe('multipleService', () => {
	it('should succeed', async () => {
		const { error, status, data } = await fetchAll()

		expect(error).toBe(null)
		expect(Array.isArray(data)).toBeTruthy()
		expect(data[0].id).toBeDefined()
	})
})
