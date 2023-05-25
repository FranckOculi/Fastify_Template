import { loginService } from './loginService'

import { registerUser } from '../register/registerService'
import { findByEmail, removeUser } from '../../../repositories/userRepository'

describe('loginService', () => {
	const user = {
		teamId: 1,
		displayName: 'testUser',
		email: 'test@test.com',
		password: 'test',
	}
	const userError = {
		teamId: 1,
		displayName: 'fakeUser',
		email: 'fakeUser@fakeUser.com',
		password: 'fakePassword',
		email: 'fakeEmail@fakeEmail.fr',
	}

	beforeEach(async () => {
		const newUser = await findByEmail(user.email)

		if (!newUser) await registerUser(user)
	})

	afterAll(async () => {
		const userWithId = await findByEmail(user.email)
		await removeUser(userWithId.id)
	})

	it("should return an error when email doesn't exist", async () => {
		const { error, status, data } = await loginService(userError)

		expect(status).toBe(401)
		expect(error).toBe('That email and password combination is incorrect')
	})

	it('should return an error when password is not valid', async () => {
		const { error, status, data } = await loginService({
			...user,
			password: 'fakePassword',
		})

		expect(status).toBe(401)
		expect(error).toBe('That email and password combination is incorrect')
	})

	it('should succeed', async () => {
		const { error, status, data } = await loginService(user)

		expect(error).toBeNull()
		expect(data.user).toBeDefined()
		expect(data.accessToken).toBeDefined()
		expect(data.refreshTokenObject.refreshToken).toBeDefined()
		expect(data.refreshTokenObject.options).toBeDefined()
	})
})
