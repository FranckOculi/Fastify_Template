'use strict'

import app from '../../app'
import { findByEmail, removeUser } from '../repositories/userRepository'
import { loginService } from '../services/auth/login/loginService'
import { registerUser } from '../services/auth/register/registerService'
import { LoginServiceResponse } from '../services/auth/login/type'
import { ServiceResponse } from '../types/service'
import { User } from '../types/user'

describe('authenticationMiddleware', () => {
	let token: string
	let userId: number
	const randomId = 3
	const newUser = {
		teamId: 2,
		displayName: 'new-authenticationMiddleware',
		email: `new-user_authenticationMiddleware@test.com`,
		password: 'new-user',
	}

	beforeEach(async () => {
		const user = <User>await findByEmail(newUser.email)

		if (!user) await registerUser(newUser)

		const { error, status, data } = <ServiceResponse<LoginServiceResponse>>(
			await loginService(newUser)
		)
		token = data?.accessToken as string
		userId = data?.user as number
	})

	afterAll(async () => {
		await removeUser(userId)
	})

	it('should return an error because no valid token', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/user/' + randomId,
			headers: { authorization: 'Bearer ' + 'coucou' },
		})

		const body = JSON.parse(response.body)
		expect(body.message).toEqual('Token not valid')
		expect(response.statusCode).toEqual(401)
	})

	it('should return user data because token is valid', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/user/' + userId,
			headers: { authorization: 'Bearer ' + token },
		})

		const body = JSON.parse(response.body)
		expect(body.message).toEqual('User data')
		expect(body.data.id).toEqual(userId)
	})
})
