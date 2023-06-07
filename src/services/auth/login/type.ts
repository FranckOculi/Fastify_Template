export type TokenObject = {
	refreshToken: string
	options: {
		httpOnly: boolean
		sameSite: 'strict'
		secure: boolean
		maxAge: number
	}
}

export interface LoginServiceResponse {
	user: number
	accessToken: string
	refreshTokenObject: TokenObject
}
