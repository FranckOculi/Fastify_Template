import { registerUser } from '../services/auth/register/registerService'
import app from '../../app'
import { findByEmail, removeUser } from '../repositories/userRepository'
import { loginService } from '../services/auth/login/loginService'
import Token from '../utils/Token'

describe('authController', () => {
	const fakeUser = {
		teamId: 999,
		displayName: 'fakeUser_authController',
		email: `fakeUser_authController@test.com`,
		password: 'fakeUser',
	}

	const newUser = {
		teamId: 2,
		displayName: 'new-authController',
		email: `new-user_authController@test.com`,
		password: 'new-user',
	}

	let newUserId
	let newUserTokenRefresh

	beforeAll(async () => {
		const user = await findByEmail(newUser.email)

		if (!user) await registerUser(newUser)

		const { error, status, data } = await loginService(newUser)
		newUserId = data.user
		newUserTokenRefresh = data.refreshTokenObject.refreshToken
	})

	afterAll(async () => {
		const user = await findByEmail(newUser.email)
		const newAdmin = await findByEmail('newAdmin@test.fr')
		const newUserTest = await findByEmail('newUser@test.fr')

		if (user) await removeUser(user.id)
		if (newAdmin) await removeUser(newAdmin.id)
		if (newUserTest) await removeUser(newUserTest.id)
	})
})
