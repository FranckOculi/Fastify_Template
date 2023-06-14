import nodemailer from 'nodemailer'
import configuration from '../config/configuration'
import { Mail } from '../types/mail'

export default class Mailer {
	transporter: nodemailer.Transporter

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

	async sendMail(mail: Mail): Promise<{
		error: string | null
		status: number | null
		data: Mail | null
	}> {
		return new Promise((resolve, reject) => {
			this.transporter.sendMail(mail, (error, info) => {
				if (error)
					return reject({
						error: 'Unable to send email',
						status: 503,
						data: mail,
					})

				return resolve({ error: null, status: null, data: mail })
			})
		})
	}
}
