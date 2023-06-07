import WelcomeEmail from './WelcomeEmail'

describe('mailService', () => {
	const newUser = {
		displayName: 'new-user_mailService',
		email: `new-user_mailService@test.com`,
	}

	describe('WelcomeEmail', () => {
		describe('constructor', () => {
			it('should succeed', () => {
				const welcomeEmail = new WelcomeEmail({})

				expect(welcomeEmail).toBeInstanceOf(WelcomeEmail)
			})
		})

		describe('WelcomeEmail methods', () => {
			it('should return an error when no user', async () => {
				const welcomeEmail = new WelcomeEmail({})

				const { error, status, message } = await welcomeEmail.getEmail()

				expect(status).toBe(503)
				expect(error).toBe('Unable to send an email')
			})

			it('should return an error when no displayName', async () => {
				const welcomeEmail = new WelcomeEmail({})

				const { error, status, message } = await welcomeEmail.getEmail()

				expect(status).toBe(503)
				expect(error).toBe('Unable to send an email')
			})

			it('should return an error when no email', async () => {
				const welcomeEmail = new WelcomeEmail({
					displayName: 'myName',
				})

				const { error, status, message } = await welcomeEmail.getEmail()

				expect(status).toBe(503)
				expect(error).toBe('Unable to send an email')
			})

			it('should return an email', async () => {
				const welcomeEmail = new WelcomeEmail(newUser)

				const { error, status, message } = await welcomeEmail.getEmail()

				expect(error).toBeNull()
				expect(message?.from).toBeDefined()
				expect(message?.to).toBe(`${newUser.displayName} '${newUser.email}'`)
				expect(message?.subject).toBeDefined()
				expect(message?.text).toBeDefined()
				expect(message?.html).toBeDefined()
			})
		})
	})
})
