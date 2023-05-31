import configuration from '../config/configuration'
import jwt from 'jsonwebtoken'
import { Token as TokenType, TokenPayload } from '../types/Token'

export default class Token {
	constructor() {}

	static options = {
		expiresIn: '1d',
	}

	static createToken = (data: TokenType, expiresIn: string | null = null) => {
		if (expiresIn) this.options.expiresIn = expiresIn

		const token: string = jwt.sign(
			data,
			configuration.token_secret,
			this.options
		)
		return token
	}

	static verifyToken = async (
		token: string
	): Promise<false | (string | TokenPayload)> => {
		let decoded: string | TokenPayload

		try {
			decoded = <TokenPayload>jwt.verify(token, configuration.token_secret)
		} catch (error) {
			return false
		}

		return decoded
	}
}
