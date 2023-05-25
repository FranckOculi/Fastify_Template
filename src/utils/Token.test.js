import Token from './Token'

describe('Token', () => {
	const token = new Token()
	const tokenData = {
		id: 5,
		email: 'test@test.fr',
		access: 'user',
	}

	describe('constructor', () => {
		it('should succeed', () => {
			expect(token).toBeInstanceOf(Token)
		})
	})

	describe('createToken method', () => {
		it('it should return an error if token instance call createToken method', () => {
			try {
				token.createToken()
			} catch (err) {
				expect(err.message).toBe('token.createToken is not a function')
			}
		})

		it('it should return an error if no payload', () => {
			try {
				Token.createToken()
			} catch (err) {
				expect(err.message).toBe('payload is required')
			}
		})

		it('it should create token with default expiresIn', async () => {
			const accessToken = Token.createToken(tokenData)

			expect(typeof accessToken).toBe('string')

			const decodedToken = await Token.verifyToken(accessToken)

			expect(decodedToken.email).toBe(tokenData.email)
		})

		it('it should create token with specific expiresIn', async () => {
			const refreshToken = Token.createToken(tokenData, '3d')

			expect(typeof refreshToken).toBe('string')

			const decodedToken = await Token.verifyToken(refreshToken)

			expect(decodedToken.email).toBe(tokenData.email)
		})
	})
})
