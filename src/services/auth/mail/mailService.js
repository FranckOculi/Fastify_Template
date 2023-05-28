import Mailer from '../../../utils/Mailer'
import WelcomeEmail from '../../../utils/mails/WelcomeEmail'

export const sendWelcomeEmail = async (user) => {
	const mailer = new Mailer()
	const welcomeEmail = new WelcomeEmail(user)

	const { error, status, message } = await welcomeEmail.getEmail()

	if (error) return { error, status }

	return await mailer
		.sendMail(message)
		.then((res) => {
			return {
				error: null,
				data: res,
			}
		})
		.catch((e) => {
			return {
				error: 'Unable to create welcome email',
				status: 503,
			}
		})
}
