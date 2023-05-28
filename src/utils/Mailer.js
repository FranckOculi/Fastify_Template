import nodemailer from 'nodemailer'
import configuration from '../config/configuration.js'

export default class Mailer {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: configuration.mail_host,
			port: configuration.mail_port,
			secure: false,
			auth: {
				user: configuration.mail_user,
				pass: configuration.mail_password,
			},
			tls: {
				rejectUnauthorized: false,
			},
		})
	}

	async sendMail(mail) {
		return new Promise((resolve, reject) => {
			this.transporter.sendMail(mail, (error, info) => {
				if (error) return reject(error)

				return resolve(info)
			})
		})
	}
}
