import Token from '../../../utils/Token'
import { refreshTokenService, verifyTokenService } from './tokenService'

describe('tokenService', () => {
	const emptyTokenObject = 'Bearer '
	const fakeTokenObject = 'Bearer something'
	const tokenData = {
		id: 5,
		email: 'test@test.fr',
		access: 'user',
	}
	const accessToken = Token.createToken(tokenData)
	const tokenObject = 'Bearer ' + accessToken

	describe('refreshTokenService', () => {
		it('should return an error when no token', async () => {
			const { error, status, data } = await refreshTokenService(null)

			expect(status).toBe(401)
			expect(error).toBe('Token required')
		})

		it('should return an error when is not possible to verify token', async () => {
			try {
				await refreshTokenService({})
			} catch (err) {
				expect(err.message).toBe('Unable to verify token')
			}
		})

		it('should return an error when token object is empty', async () => {
			const { error, status, data } = await refreshTokenService(
				emptyTokenObject
			)

			expect(status).toBe(401)
			expect(error).toBe('Token required')
		})

		it('should return an error when token not valid', async () => {
			const { error, status, data } = await refreshTokenService(fakeTokenObject)

			expect(status).toBe(401)
			expect(error).toBe('Token not valid')
		})

		it('should succeed', async () => {
			const { error, status, data } = await refreshTokenService(tokenObject)

			expect(error).toBeNull()
			expect(data.user).toBeDefined()
			expect(data.accessToken).toBeDefined()
		})
	})
})
