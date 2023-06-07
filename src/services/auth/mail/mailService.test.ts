import {
	createUser,
	findByEmail,
	removeUser,
} from '../../../repositories/userRepository'
import { sendWelcomeEmail } from './mailService'
import { User } from '../../../types/user'

describe('mailService', () => {
	const newUser = {
		teamId: 2,
		displayName: 'new-user_mailService',
		email: `new-user_mailService@test.com`,
		password: 'new-user',
	}

	beforeAll(async () => {
		const user = await findByEmail(newUser.email)

		if (!user) await createUser(newUser)
	})

	afterAll(async () => {
		const user = <User>await findByEmail(newUser.email)

		if (user) removeUser(user.id)
	})

	describe('sendWelcomeEmail', () => {
		it('should return an error when no user', async () => {
			const { error, status, data } = await sendWelcomeEmail(null)

			expect(status).toBe(503)
			expect(error).toBe('Unable to send an email')
		})

		it('should return an error when no displayName', async () => {
			const { error, status, data } = await sendWelcomeEmail({})

			expect(status).toBe(503)
			expect(error).toBe('Unable to send an email')
		})

		it('should return an error when no email', async () => {
			const { error, status, data } = await sendWelcomeEmail({
				displayName: 'myName',
			})

			expect(status).toBe(503)
			expect(error).toBe('Unable to send an email')
		})

		it('should return an sent email', async () => {
			const { error, status, data } = await sendWelcomeEmail(newUser)

			expect(error).toBeNull()
			expect(data.to).toBe(newUser.email)
		})
	})
})
