import { FastifyReply, FastifyRequest } from 'fastify'
import * as msal from '@azure/msal-node'

const config = {
	auth: {
		clientId: process.env.CLIENT_ID,
		authority: process.env.AUTHORITY,
		clientSecret: process.env.CLIENT_SECRET,
	},
	system: {
		loggerOptions: {
			loggerCallback(loglevel, message, containsPii) {
				console.log(message)
			},
			piiLoggingEnabled: false,
		},
	},
}

const pca = new msal.PublicClientApplication(config)

const authCodeUrlParameters = {
	scopes: ['user.read'],
	redirectUri: process.env.REDIRECT_URI,
}

export const login_microsoft = async (
	req: FastifyRequest,
	res: FastifyReply
) => {
	const response = await pca
		.getAuthCodeUrl(authCodeUrlParameters)
		.catch((error) => console.log(JSON.stringify(error)))

	return res.code(200).send({ data: response })
}

export const auth_microsoft = async (
	req: FastifyRequest<{ Params: { code: string } }>,
	res: FastifyReply
) => {
	const { code } = req.params

	const tokenRequest = {
		...authCodeUrlParameters,
		code: code,
	}

	await pca
		.acquireTokenByCode(tokenRequest)
		.then((response) => {
			res.code(200).send({ message: response })
		})
		.catch((error) => {
			console.log(error)
			res.code(500).send(error)
		})
}
