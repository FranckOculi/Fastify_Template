'use strict'

import app from '../../app'
import { findByEmail, removeUser } from '../repositories/userRepository'
import { loginService } from '../services/auth/login/loginService'
import { registerUser } from '../services/auth/register/registerService'

describe('authenticationMiddleware', () => {
	let userToken
	let userId
	let adminToken
	let adminId
	const randomId = 3
	const newUser = {
		teamId: 2,
		displayName: 'new-authenticationMiddleware',
		email: `new-user_authenticationMiddleware@test.com`,
		password: 'new-user',
	}
	const newAdmin = {
		teamId: 2,
		displayName: 'new-admin_authenticationMiddleware',
		email: `new-admin_authenticationMiddleware@test.com`,
		password: 'new-admin',
		access: 'admin',
	}

	beforeEach(async () => {
		const user = await findByEmail(newUser.email)
		const admin = await findByEmail(newAdmin.email)

		if (!user) await registerUser(newUser)
		if (!admin) await registerUser(newAdmin)

		const { data: userData } = await loginService(newUser)
		userToken = userData.accessToken
		userId = userData.user

		const { data: adminData } = await loginService(newAdmin)
		adminToken = adminData.accessToken
		adminId = adminData.user
	})

	afterAll(async () => {
		await removeUser(userId)
		await removeUser(adminId)
	})

	it('should return an error because user id is different than target id', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/user/' + randomId,
			headers: { authorization: 'Bearer ' + userToken },
		})

		const body = JSON.parse(response.body)
		expect(body.message).toEqual('Error token')
		expect(response.statusCode).toEqual(401)
	})

	it('should return user data because user is admin', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/user/' + randomId,
			headers: { authorization: 'Bearer ' + adminToken },
		})

		const body = JSON.parse(response.body)
		expect(body.message).toEqual('User data')
		expect(body.data.id).toEqual(randomId)
	})

	it('should return user data because user id is the same as target id', async () => {
		const response = await app.inject({
			method: 'GET',
			url: '/user/' + userId,
			headers: { authorization: 'Bearer ' + userToken },
		})

		const body = JSON.parse(response.body)
		expect(body.message).toEqual('User data')
		expect(body.data.id).toEqual(userId)
	})
})
