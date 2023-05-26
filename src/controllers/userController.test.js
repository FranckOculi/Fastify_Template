import app from '../../app'

import { findByEmail, removeUser } from '../repositories/userRepository'
import { registerUser } from '../services/auth/register/registerService'
import { loginService } from '../services/auth/login/loginService'

describe('userController', () => {
	const newUser = {
		teamId: 2,
		displayName: 'new-authController',
		email: `new-user_authController@test.com`,
		password: 'new-user',
	}

	const newAdmin = {
		teamId: 2,
		displayName: 'new-admin_authController',
		email: `new-admin_authController@test.com`,
		password: 'new-admin',
		access: 'admin',
	}

	const randomId = 9999

	let newUserId
	let newUserTokenRefresh
	let newUserAccessToken

	let newAdminAccessToken
	let newAdminId

	beforeEach(async () => {
		const user = await findByEmail(newUser.email)
		const admin = await findByEmail(newAdmin.email)

		if (!user) await registerUser(newUser)
		if (!admin) await registerUser(newAdmin)

		const { error, status, data } = await loginService(newUser)
		newUserId = data.user
		newUserTokenRefresh = data.refreshTokenObject.refreshToken
		newUserAccessToken = data.accessToken

		const { data: adminData } = await loginService(newAdmin)
		newAdminAccessToken = adminData.accessToken
		newAdminId = adminData.user
	})

	afterAll(async () => {
		const user = await findByEmail(newUser.email)
		const admin = await findByEmail(newAdmin.email)
		const newUserTest = await findByEmail('newUser@test.fr')

		if (user) await removeUser(user.id)
		if (admin) await removeUser(admin.id)
		if (newUserTest) await removeUser(newUserTest.id)
	})

	describe('getSingleUser', () => {
		describe('Route protections', () => {
			it('should return an error when no token object', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/' + randomId,
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})

			it('should return an error when no token', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/' + randomId,
					headers: { authorization: 'Bearer ' },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})

			it('should return an error when token is not valid', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/' + randomId,
					headers: { authorization: 'Bearer ' + {} },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token not valid')
			})

			it('should return an error because user id is different than target id', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/' + randomId,
					headers: { authorization: 'Bearer ' + newUserAccessToken },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Error token')
			})
		})

		describe('Route mandatory fields', () => {
			it('should return an error when no id in param', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/',
					headers: { authorization: 'Bearer ' + newUserAccessToken },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(400)
				expect(body.message).toEqual('params/id must be number')
			})
		})

		describe('Route errors', () => {
			it("should return an error when user doesn't exist", async () => {
				await removeUser(newUserId)
				const response = await app.inject({
					method: 'GET',
					url: '/user/' + newUserId,
					headers: { authorization: 'Bearer ' + newUserAccessToken },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(404)
				expect(body.message).toEqual("This user doesn't exist")
			})
		})

		describe('Route success', () => {
			it('should return user data', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/' + newUserId,
					headers: { authorization: 'Bearer ' + newUserAccessToken },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(200)
				expect(body.message).toEqual('User data')
				expect(body.data.id).toEqual(newUserId)
			})
		})
	})

	describe('getAllUsers', () => {
		describe('Route protections', () => {
			it('should return an error when no token object', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/all',
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})

			it('should return an error when no token', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/all',
					headers: { authorization: 'Bearer ' },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})

			it('should return an error when token is not valid', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/all',
					headers: { authorization: 'Bearer ' + {} },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token not valid')
			})
		})

		describe('Route success', () => {
			it('should return users data', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/all',
					headers: { authorization: 'Bearer ' + newUserAccessToken },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(200)
				expect(body.message).toEqual('All users')
				expect(Array.isArray(body.data)).toBeTruthy()
			})
		})
	})
})
