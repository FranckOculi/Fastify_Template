import { FastifyReply, FastifyRequest } from 'fastify'
import { registerUser } from '../services/auth/register/registerService'
import { loginService } from '../services/auth/login/loginService'
import { refreshTokenService } from '../services/auth/token/tokenService'
import { User } from 'src/types/User'

export const signUp = async (
	req: FastifyRequest<{ Body: Partial<User> }>,
	res: FastifyReply
) => {
	const { error, status, data } = await registerUser({
		teamId: req.body.teamId,
		displayName: req.body.displayName,
		email: req.body.email,
		password: req.body.password,
		access: req.body.access || '',
		phone: req.body.phone || '',
	})

	if (error) return res.code(status).send({ message: error })

	return res.code(201).send({
		message: 'User added !',
		data,
	})
}

export const login = async (
	req: FastifyRequest<{
		Body: Partial<User>
	}>,
	res: FastifyReply
) => {
	const { error, status, data } = await loginService({
		email: req.body.email,
		password: req.body.password,
	})

	if (error) return res.code(status).send({ message: error })

	const dataResponse = {
		user: data.user,
		accessToken: data.accessToken,
	}

	res.cookie(
		'jwt',
		data.refreshTokenObject.refreshToken,
		data.refreshTokenObject.options
	)

	return res.code(200).send({
		message: 'Authenticated with success !',
		data: dataResponse,
	})
}

export const refresh = async (
	req: FastifyRequest<{
		Headers: { cookies: { jwt: string } }
	}>,
	res: FastifyReply
) => {
	const { error, status, data } = await refreshTokenService(req.cookies?.jwt)

	if (error) return res.code(status).send({ message: error })

	return res.code(200).send({
		message: 'Authenticated with success !',
		data,
	})
}
