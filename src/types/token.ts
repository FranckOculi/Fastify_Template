import jwt from 'jsonwebtoken'

export type Token = {
	id: number
	email: string
	access: string
}

export interface TokenPayload extends jwt.JwtPayload {
	id: number
	email: string
	access: string
}
