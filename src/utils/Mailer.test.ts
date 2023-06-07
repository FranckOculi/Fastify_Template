import configuration from '../config/configuration'
import Mailer from './Mailer'
import { Mail } from '../types/mail'

describe('Mailer', () => {
	const recever = 'coucou@gmail.com'
	const message: Mail = {
		from: `'<${configuration.mail_user}>'`,
		to: `'${recever}'`,
		subject: `'App test'`,
		text: 'Hello world',
		html: '<b>Hello world?</b>',
	}
	const errorMessage = {
		subject: `'App test'`,
		text: 'Hello world',
		html: '<b>Hello world?</b>',
	}

	describe('constructor', () => {
		it('should succeed', () => {
			const mailer = new Mailer()

			expect(mailer).toBeInstanceOf(Mailer)
		})
	})

	describe('sendMail method', () => {
		it('it should return an error', async () => {
			const mailer = new Mailer()

			const { error, status, data } = await mailer.sendMail(
				errorMessage as Mail
			)

			expect(status).toBe(503)
			expect(error).toBe('Unable to send email')
		})
		it('it should return sent email', async () => {
			const mailer = new Mailer()

			const { error, status, data } = await mailer.sendMail(message)

			expect(data.from).toBe(message.from)
			expect(data.subject).toBe(message.subject)
		})
	})
})
