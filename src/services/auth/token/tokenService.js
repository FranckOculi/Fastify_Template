import Token from '../../../utils/Token.js'

export const refreshTokenService = async (tokenObject) => {
	if (!tokenObject) return { error: 'Token required', status: 401 }
	else {
		try {
			const token = tokenObject.replace('Bearer ', '')

			if (token) {
				const decodedToken = await Token.verifyToken(token)

				if (!decodedToken) return { error: 'Token not valid', status: 401 }

				const accessToken = Token.createToken({
					id: decodedToken.id,
					email: decodedToken.email,
					access: decodedToken.access,
				})

				return {
					error: null,
					data: {
						user: decodedToken.id,
						accessToken,
					},
				}
			} else {
				return { error: 'Token required', status: 401 }
			}
		} catch (err) {
			throw new Error('Unable to verify token')
		}
	}
}

export const verifyTokenService = async (tokenObject) => {
	if (!tokenObject) return { error: 'Token required', status: 401 }
	else {
		try {
			const token = tokenObject.replace('Bearer ', '')

			if (token) {
				const decodedToken = await Token.verifyToken(token)

				if (!decodedToken) return { error: 'Token not valid', status: 401 }

				return { error: null, data: decodedToken }
			} else {
				return { error: 'Token required', status: 401 }
			}
		} catch (err) {
			throw new Error('Unable to verify token')
		}
	}
}
