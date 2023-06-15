import { FastifyReply, FastifyRequest } from 'fastify'
import { RequestHeaders } from '../types/request'

export const permissionVerification = async (
	req: FastifyRequest<{
		Headers: RequestHeaders
		Params: {
			id: string
		}
	}>,
	res: FastifyReply
) => {
	if (
		typeof req.headers.tokenInfo === 'object' &&
		req.headers.tokenInfo.authorization.access === 'admin'
	)
		return
	else if (
		typeof req.headers.tokenInfo === 'object' &&
		req.headers.tokenInfo.authorization.id !== parseInt(req.params.id)
	)
		return res.code(401).send({ message: 'Error token' })

	return
}
