import bcrypt from 'bcrypt'

import { findByEmail } from '../../../repositories/userRepository'
import Token from '../../../utils/Token'
import { ServiceResponse } from 'src/types/service'
import { User } from 'src/types/user'
import { LoginServiceResponse } from './type'

export const loginService = async (
	data: Partial<User>
): Promise<ServiceResponse<LoginServiceResponse>> => {
	const user = await findByEmail(data.email, [
		'id',
		'teamId',
		'email',
		'password',
		'access',
	])

	if (!user)
		return {
			error: 'That email and password combination is incorrect',
			status: 401,
			data: null,
		}

	const isValidPassword = await bcrypt.compare(data.password, user.password)

	if (!isValidPassword)
		return {
			error: 'That email and password combination is incorrect',
			status: 401,
			data: null,
		}

	const refreshToken = Token.createToken(
		{
			id: user.id,
			email: user.email,
			access: user.access,
		},
		'3d'
	)

	const accessToken = Token.createToken({
		id: user.id,
		email: user.email,
		access: user.access,
	})

	return {
		error: null,
		status: null,
		data: {
			user: user.id,
			accessToken,
			refreshTokenObject: {
				refreshToken,
				options: {
					httpOnly: true,
					sameSite: 'Strict' as 'strict',
					secure: true,
					domain: 'localhost',
					path: '/',
					maxAge: 60 * 60 * 24 * 3,
				},
			},
		},
	}
}
