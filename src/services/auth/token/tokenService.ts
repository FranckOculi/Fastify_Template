import Token from '../../../utils/Token'
import { ServiceResponse } from 'src/types/service'
import { TokenPayload } from 'src/types/token'

export const refreshTokenService = async (
	tokenObject: string
): Promise<ServiceResponse<{ user: number; accessToken: string }>> => {
	if (!tokenObject) return { error: 'Token required', status: 401, data: null }
	else {
		try {
			const token = tokenObject.replace('Bearer ', '')

			if (token) {
				const decodedToken = <TokenPayload>await Token.verifyToken(token)

				if (!decodedToken)
					return { error: 'Token not valid', status: 401, data: null }

				const accessToken = Token.createToken({
					id: decodedToken.id,
					email: decodedToken.email,
					access: decodedToken.access,
				})

				return {
					error: null,
					status: null,
					data: {
						user: decodedToken.id,
						accessToken,
					},
				}
			} else {
				return { error: 'Token required', status: 401, data: null }
			}
		} catch (err) {
			throw new Error('Unable to verify token')
		}
	}
}

export const verifyTokenService = async (
	tokenObject: string
): Promise<ServiceResponse<TokenPayload>> => {
	if (!tokenObject) return { error: 'Token required', status: 401, data: null }
	else {
		try {
			const token = tokenObject.replace('Bearer ', '')

			if (token) {
				const decodedToken = <TokenPayload>await Token.verifyToken(token)

				if (!decodedToken)
					return { error: 'Token not valid', status: 401, data: null }

				return { error: null, status: null, data: decodedToken }
			} else {
				return { error: 'Token required', status: 401, data: null }
			}
		} catch (err) {
			throw new Error('Unable to verify token')
		}
	}
}
