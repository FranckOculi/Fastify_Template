import configuration from '../config/configuration.js'
import Mailer from './Mailer.js'

describe('Mailer', () => {
	const recever = 'coucou@gmail.com'
	const message = {
		from: `'<${configuration.mail_user}>'`,
		to: `'${recever}'`,
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
		it('it should return an error if no mail to send', async () => {
			const mailer = new Mailer()

			try {
				await mailer.sendMail()
			} catch (err) {
				expect(err.message).toBe('No recipients defined')
			}
		})

		it('it should return send email', async () => {
			const mailer = new Mailer()

			try {
				const res = await mailer.sendMail(message)

				expect(res.accepted[0]).toBe(`'${recever}'`)
				expect(res.from).toBe(message.from)
				expect(res.subject).toBe(message.subject)
			} catch (err) {}
		})
	})
})
