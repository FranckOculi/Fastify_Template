import configuration from '../../config/configuration'
import { User } from '../../types/user'

export default class WelcomeEmail {
	static appName = 'template Fastify'
	user: Partial<User>

	constructor(user: Partial<User>) {
		this.user = user
	}

	getFrom() {
		return `'Fastify Template <${configuration.mail_user}>'`
	}

	getReceiver() {
		// return `${this.user.displayName} '${this.user.email}'`;
		return `'${configuration.mail_user}'`
	}

	getSubject() {
		return `'Bienvenue dans notre ${WelcomeEmail.appName}'`
	}

	getText() {
		return 'Hello world'
	}

	getHtml() {
		return '<b>Hello world?</b>'
	}

	async getEmail() {
		if (!this.user?.displayName || !this.user?.email)
			return { error: 'Unable to send an email', status: 503, message: null }

		return {
			error: null,
			status: null,
			message: {
				from: this.getFrom(),
				to: this.getReceiver(),
				subject: this.getSubject(),
				text: this.getText(),
				html: this.getHtml(),
			},
		}
	}
}
