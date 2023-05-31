import Mailer from '../../../utils/Mailer'
import WelcomeEmail from '../../../utils/mails/WelcomeEmail'
import { ServiceResponse } from 'src/types/Service'
import { Mail } from 'src/types/Mail'
import { User } from 'src/types/User'

export const sendWelcomeEmail = async (
	user: Partial<User>
): Promise<ServiceResponse<Mail>> => {
	const mailer = new Mailer()
	const welcomeEmail = new WelcomeEmail(user)

	const { error, status, message } = await welcomeEmail.getEmail()

	if (error) return { error, status, data: null }

	await mailer
		.sendMail(message)
		.then((res) => {
			return {
				error: null,
				status: null,
				data: res,
			}
		})
		.catch((e) => {
			return {
				error: e,
				status: 503,
				data: null,
			}
		})
}
