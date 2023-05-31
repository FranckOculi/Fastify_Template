import { FastifyReply, FastifyRequest } from 'fastify'
import { verifyTokenService } from '../services/auth/token/tokenService'

export const tokenVerification = async (
	req: FastifyRequest<{
		Headers: { authorization: string }
	}>,
	res: FastifyReply
) => {
	const { error, status, data } = await verifyTokenService(
		req.headers.authorization
	)

	if (error) return res.code(status).send({ message: error })

	req.headers.tokenInfo = JSON.stringify({
		authorization: { id: data.id, access: data.access },
	})

	return
}
