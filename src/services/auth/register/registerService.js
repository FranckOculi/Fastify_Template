import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'

import {
	createTeam,
	findById,
	findByName,
} from '../../../repositories/teamRepository.js'
import {
	createUser,
	findByEmail,
} from '../../../repositories/userRepository.js'
import { sendWelcomeEmail } from '../mail/mailService.js'

export const registerUser = async (data) => {
	const team = await findById(data.teamId)
	if (!team) return { error: "This team doesn't exist", status: 404 }

	const user = await findByEmail(data.email)
	if (user) return { error: 'This email is already taken', status: 409 }

	const salt = await bcrypt.genSalt()
	const hash = await bcrypt.hash(data.password, salt)

	const newUser = await createUser({
		teamId: data.teamId,
		displayName: data.displayName,
		email: data.email,
		password: hash,
		access: data.access ?? 'staff',
		phone: data.phone,
		createdAt: new Date(),
	})

	const { error, status } = await sendWelcomeEmail(newUser)

	if (error)
		return {
			error,
			status,
		}

	return { error: null, data: newUser }
}

export const registerTeam = async (data) => {
	const team = await findByName(data.name)
	if (team) return { error: 'This name is already taken', status: 409 }

	const newTeam = await createTeam(data)

	return { error: null, data: newTeam }
}
