import app from '../../app'

import { findByEmail, removeUser } from '../repositories/userRepository'
import { registerUser } from '../services/auth/register/registerService'
import { loginService } from '../services/auth/login/loginService'
import { User } from '../types/user'
import { ServiceResponse } from '../types/service'
import { LoginServiceResponse } from '../services/auth/login/type'

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

	let newUserId: number
	let newUserTokenRefresh: string
	let newUserAccessToken: string

	let newAdminAccessToken: string
	let newAdminId: number

	beforeEach(async () => {
		const user = await findByEmail(newUser.email)
		const admin = await findByEmail(newAdmin.email)

		if (!user) await registerUser(newUser)
		if (!admin) await registerUser(newAdmin)

		const { error, status, data } = <ServiceResponse<LoginServiceResponse>>(
			await loginService(newUser)
		)
		newUserId = data?.user as number
		newUserTokenRefresh = data?.refreshTokenObject?.refreshToken as string
		newUserAccessToken = data?.accessToken as string

		const { data: adminData } = <ServiceResponse<LoginServiceResponse>>(
			await loginService(newAdmin)
		)
		newAdminAccessToken = adminData?.accessToken as string
		newAdminId = adminData?.user as number
	})

	afterAll(async () => {
		const user = <User>await findByEmail(newUser.email)
		const admin = <User>await findByEmail(newAdmin.email)
		const newUserTest = <User>await findByEmail('newUser@test.fr')

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

	describe('updateUser', () => {
		describe('Route protections', () => {
			it('should return an error when no token object', async () => {
				const response = await app.inject({
					method: 'PUT',
					url: '/user/update/' + randomId,
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})

			it('should return an error when no token', async () => {
				const response = await app.inject({
					method: 'PUT',
					url: '/user/update/' + randomId,
					headers: { authorization: 'Bearer ' },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})

			it('should return an error when token is not valid', async () => {
				const response = await app.inject({
					method: 'PUT',
					url: '/user/update/' + randomId,
					headers: { authorization: 'Bearer ' + {} },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token not valid')
			})
		})

		describe('Route mandatory fields', () => {
			it('should return an error when no id in param', async () => {
				const response = await app.inject({
					method: 'PUT',
					url: '/user/update/',
					headers: { authorization: 'Bearer ' + newUserAccessToken },
				})
				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(400)
				expect(body.message).toEqual('params/id must be number')
			})
		})

		describe('Route errors', () => {
			it("should return an error when user doesnt' exist", async () => {
				await removeUser(newUserId)

				const response = await app.inject({
					method: 'PUT',
					url: '/user/update/' + newUserId,
					headers: { authorization: 'Bearer ' + newUserAccessToken },
					payload: {
						displayName: 'updated user',
					},
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(404)
				expect(body.message).toEqual("This user doesn't exist")
			})
		})

		describe('Route succeed', () => {
			it('should return an updated user', async () => {
				const response = await app.inject({
					method: 'PUT',
					url: '/user/update/' + newUserId,
					headers: { authorization: 'Bearer ' + newUserAccessToken },
					payload: {
						displayName: 'updated user',
					},
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(201)
				expect(body.message).toEqual('User updated !')
				expect(body.data.displayName).toEqual('updated user')
			})
		})
	})

	describe('deleteUser', () => {
		describe('Route protections', () => {
			it('should return an error when no token object', async () => {
				const response = await app.inject({
					method: 'DELETE',
					url: '/user/delete/' + randomId,
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})

			it('should return an error when no token', async () => {
				const response = await app.inject({
					method: 'DELETE',
					url: '/user/delete/' + randomId,
					headers: { authorization: 'Bearer ' },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})

			it('should return an error when token is not valid', async () => {
				const response = await app.inject({
					method: 'DELETE',
					url: '/user/delete/' + randomId,
					headers: { authorization: 'Bearer ' + {} },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token not valid')
			})

			it('should return an error because user id is different than target id', async () => {
				const response = await app.inject({
					method: 'DELETE',
					url: '/user/delete/' + randomId,
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
					method: 'DELETE',
					url: '/user/delete/',
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
					method: 'DELETE',
					url: '/user/delete/' + newUserId,
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
					method: 'DELETE',
					url: '/user/delete/' + newUserId,
					headers: { authorization: 'Bearer ' + newUserAccessToken },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(200)
				expect(body.message).toEqual('User deleted !')
			})
		})
	})

	describe('getMe', () => {
		describe('Route protections', () => {
			it('should return an error when no token object', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/me/' + randomId,
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})

			it('should return an error when no token', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/me/' + randomId,
					headers: { authorization: 'Bearer ' },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})

			it('should return an error when token is not valid', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/me/' + randomId,
					headers: { authorization: 'Bearer ' + {} },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token not valid')
			})

			it('should return an error because user id is different than target id', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/me/' + randomId,
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
					url: '/user/me/',
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
					url: '/user/me/' + newUserId,
					headers: { authorization: 'Bearer ' + newUserAccessToken },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(404)
				expect(body.message).toEqual("This user doesn't exist")
			})
		})

		describe('Route success', () => {
			it('should return user data because user is admin', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/me/' + newUserId,
					headers: { authorization: 'Bearer ' + newAdminAccessToken },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(200)
				expect(body.message).toEqual('me')
				expect(body.data.user.id).toEqual(newUserId)
				expect(body.data.team.id).toEqual(newUser.teamId)
			})

			it('should return user data because user id is the same as target id', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/user/me/' + newUserId,
					headers: { authorization: 'Bearer ' + newUserAccessToken },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(200)
				expect(body.message).toEqual('me')
				expect(body.data.user.id).toEqual(newUserId)
				expect(body.data.team.id).toEqual(newUser.teamId)
			})
		})
	})
})
