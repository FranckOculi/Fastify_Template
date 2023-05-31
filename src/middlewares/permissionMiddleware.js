import { FastifyReply, FastifyRequest } from 'fastify'

export const permissionVerification = async (
	req: FastifyRequest<{
		Headers: {
			tokenInfo: {
				authorization: {
					id: number
					access: string
				}
			}
		}
		Params: {
			id: string
		}
	}>,
	res: FastifyReply
) => {
	if (req.headers.tokenInfo.authorization.access === 'admin') return
	else if (req.headers.tokenInfo.authorization.id !== parseInt(req.params.id))
		return res.code(401).send({ message: 'Error token' })

	return
}
