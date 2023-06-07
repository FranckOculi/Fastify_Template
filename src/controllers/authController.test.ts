import app from '../../app'
import { registerUser } from '../services/auth/register/registerService'
import { findByEmail, removeUser } from '../repositories/userRepository'
import { loginService } from '../services/auth/login/loginService'
import Token from '../utils/Token'
import { User } from '../types/user'
import { ServiceResponse } from '../types/service'
import { LoginServiceResponse } from '../services/auth/login/type'

jest.useFakeTimers()
describe('authController', () => {
	const fakeUser = {
		teamId: 999,
		displayName: 'fakeUser_authController',
		email: `fakeUser_authController@test.com`,
		password: 'fakeUser',
	} as User

	const newUser = {
		teamId: 2,
		displayName: 'new-authController',
		email: `new-user_authController@test.com`,
		password: 'new-user',
	} as User

	let newUserId: number
	let newUserTokenRefresh: string

	beforeEach(async () => {
		const user = <User>await findByEmail(newUser.email)

		if (!user) await registerUser(newUser)

		const { error, status, data } = <ServiceResponse<LoginServiceResponse>>(
			await loginService(newUser)
		)
		newUserId = data?.user as number
		newUserTokenRefresh = data?.refreshTokenObject.refreshToken as string
	})

	afterEach(async () => {
		const user = <User>await findByEmail(newUser.email)
		const newAdmin = <User>await findByEmail('newAdmin@test.fr')
		const newUserTest = <User>await findByEmail('newUser@test.fr')

		if (user) await removeUser(user.id)
		if (newAdmin) await removeUser(newAdmin.id)
		if (newUserTest) await removeUser(newUserTest.id)
	})

	describe('signUp', () => {
		describe('Route protections', () => {
			it('should return an error when no payload', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/register',
				})

				const body = JSON.parse(response.body)
				expect(body.statusCode).toEqual(400)
				expect(body.error).toEqual('Bad Request')
				expect(body.message).toEqual('body must be object')
			})
		})

		describe('Route mandatory fields', () => {
			it('should return an error when no teamId', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/register',
					payload: {},
				})

				const body = JSON.parse(response.body)
				expect(body.statusCode).toEqual(400)
				expect(body.error).toEqual('Bad Request')
				expect(body.message).toEqual(
					"body must have required property 'teamId'"
				)
			})
			it('should return an error when no displayName', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/register',
					payload: {
						teamId: 1,
					},
				})

				const body = JSON.parse(response.body)
				expect(body.statusCode).toEqual(400)
				expect(body.error).toEqual('Bad Request')
				expect(body.message).toEqual(
					"body must have required property 'displayName'"
				)
			})

			it('should return an error when no email', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/register',
					payload: {
						teamId: 1,
						displayName: 'fakeUser',
					},
				})

				const body = JSON.parse(response.body)
				expect(body.statusCode).toEqual(400)
				expect(body.error).toEqual('Bad Request')
				expect(body.message).toEqual("body must have required property 'email'")
			})

			it('should return an error when no password', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/register',
					payload: {
						teamId: 1,
						displayName: 'fakeUser',
						email: 'fakeEmail',
					},
				})

				const body = JSON.parse(response.body)
				expect(body.statusCode).toEqual(400)
				expect(body.error).toEqual('Bad Request')
				expect(body.message).toEqual(
					"body must have required property 'password'"
				)
			})
		})

		describe('Route errors', () => {
			it("should return an error when team doesn't exist", async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/register',
					payload: fakeUser,
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(404)
				expect(body.message).toEqual("This team doesn't exist")
			})

			it('should return an error when email is already taken', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/register',
					payload: newUser,
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(409)
				expect(body.message).toEqual('This email is already taken')
			})

			it('should return an error when email is already taken', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/register',
					payload: newUser,
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(409)
				expect(body.message).toEqual('This email is already taken')
			})
		})

		describe('Route success', () => {
			it('should succeed to registry an admin', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/register',
					payload: { ...newUser, email: 'newAdmin@test.fr', access: 'admin' },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(201)
				expect(body.message).toEqual('User added !')
				expect(body).toEqual(1)
				expect(body.data.email).toEqual('newAdmin@test.fr')
				expect(body.data.access).toEqual('admin')
			})

			it('should succeed to registry a user', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/register',
					payload: { ...newUser, email: 'newUser@test.fr' },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(201)
				expect(body.message).toEqual('User added !')
				expect(body.data.email).toEqual('newUser@test.fr')
				expect(body.data.access).toEqual('staff')
			})
		})
	})

	describe('login', () => {
		describe('Route protections', () => {
			it('should return an error when no payload', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/login',
				})

				const body = JSON.parse(response.body)
				expect(body.statusCode).toEqual(400)
				expect(body.error).toEqual('Bad Request')
				expect(body.message).toEqual('body must be object')
			})
		})

		describe('Route mandatory fields', () => {
			it('should return an error when no email', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/login',
					payload: {},
				})

				const body = JSON.parse(response.body)
				expect(body.statusCode).toEqual(400)
				expect(body.error).toEqual('Bad Request')
				expect(body.message).toEqual("body must have required property 'email'")
			})

			it('should return an error when no password', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/login',
					payload: {
						teamId: 1,
						displayName: 'fakeUser',
						email: 'fakeEmail',
					},
				})

				const body = JSON.parse(response.body)
				expect(body.statusCode).toEqual(400)
				expect(body.error).toEqual('Bad Request')
				expect(body.message).toEqual(
					"body must have required property 'password'"
				)
			})
		})

		describe('Route errors', () => {
			it("should return an error when user doesn't exist", async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/login',
					payload: fakeUser,
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual(
					'That email and password combination is incorrect'
				)
			})

			it("should return an error when password doesn't match", async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/login',
					payload: { email: newUser.email, password: 'fakePassword' },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual(
					'That email and password combination is incorrect'
				)
			})
		})

		describe('Route success', () => {
			it('should succeed to login', async () => {
				const response = await app.inject({
					method: 'POST',
					url: '/auth/login',
					payload: newUser,
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(200)
				expect(body.message).toEqual('Authenticated with success !')
				expect(body.data.user).toEqual(newUserId)
				expect(body.data.accessToken).toBeDefined()
				expect(
					response.cookies.filter(cookie => cookie.name === 'jwt')
				).toBeDefined()
				expect(response.cookies.filter(cookie => cookie.httpOnly)).toBeTruthy()
				expect(
					response.cookies.filter(cookie => cookie.sameSite === 'None')
				).toBeTruthy()
				expect(response.cookies.filter(cookie => cookie.secure)).toBeTruthy()
			})
		})
	})

	describe('refresh', () => {
		describe('Route protections', () => {
			it('should return an error when no token', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/auth/refresh',
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})
		})

		describe('Route Route mandatory fields', () => {
			it('should return an error when token not a object', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/auth/refresh',
					cookies: { coucou: 'coucou' },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token required')
			})

			it('should return an error when token not valid', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/auth/refresh',
					cookies: { jwt: 'coucou' },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(401)
				expect(body.message).toEqual('Token not valid')
			})
		})

		describe('Routes success', () => {
			it('should succeed', async () => {
				const response = await app.inject({
					method: 'GET',
					url: '/auth/refresh',
					cookies: { jwt: 'Bearer ' + newUserTokenRefresh },
				})

				const body = JSON.parse(response.body)
				expect(response.statusCode).toEqual(200)
				expect(body.message).toEqual('Authenticated with success !')
				expect(body.data.user).toBe(newUserId)
				expect(body.data.accessToken).toBeDefined()
			})
		})
	})
})
