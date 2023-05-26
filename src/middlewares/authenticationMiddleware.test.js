'use strict'

import app from '../../app'
import { findByEmail, removeUser } from '../repositories/userRepository'
import { loginService } from '../services/auth/login/loginService'
import { registerUser } from '../services/auth/register/registerService'

describe('authenticationMiddleware', () => {
	let token
	let userId
	const randomId = 3
	const newUser = {
		teamId: 2,
		displayName: 'new-authenticationMiddleware',
		email: `new-user_authenticationMiddleware@test.com`,
		password: 'new-user',
	}

	beforeEach(async () => {
		const user = await findByEmail(newUser.email)

		if (!user) await registerUser(newUser)

		const { error, status, data } = await loginService(newUser)
		token = data.accessToken
		userId = data.user
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
