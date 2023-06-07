import Token from './Token'
import { TokenPayload, Token as TokenType } from '../types/token'

describe('Token', () => {
	const token = new Token()
	const tokenData: TokenType = {
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
		it('it should create token with default expiresIn', async () => {
			const accessToken = Token.createToken(tokenData)

			expect(typeof accessToken).toBe('string')

			const decodedToken = <TokenPayload>await Token.verifyToken(accessToken)

			expect(decodedToken.email).toBe(tokenData.email)
		})

		it('it should create token with specific expiresIn', async () => {
			const refreshToken = Token.createToken(tokenData, '3d')

			expect(typeof refreshToken).toBe('string')

			const decodedToken = <TokenPayload>await Token.verifyToken(refreshToken)

			expect(decodedToken.email).toBe(tokenData.email)
		})
	})
})
