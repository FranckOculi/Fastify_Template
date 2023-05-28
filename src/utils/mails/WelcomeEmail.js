import configuration from '../../config/configuration.js'

export default class WelcomeEmail {
	appName = 'template Fastify'

	constructor(user) {
		this.user = user
	}

	getFrom() {
		return `'Fastify Template <${configuration.mail_user}>'`
	}

	getReceiver() {
		return `${this.user.displayName} '${this.user.email}'`
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
}
