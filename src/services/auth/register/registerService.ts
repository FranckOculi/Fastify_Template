import bcrypt from 'bcrypt'

import {
	createTeam,
	findById,
	findByName,
} from '../../../repositories/teamRepository'
import { createUser, findByEmail } from '../../../repositories/userRepository'
import { sendWelcomeEmail } from '../mail/mailService'
import { User } from 'src/types/user'
import { Team } from 'src/types/team'
import { ServiceResponse } from 'src/types/service'

export const registerUser = async (
	data: Partial<User>
): Promise<ServiceResponse<Partial<User>>> => {
	const team = await findById(data.teamId)
	if (!team)
		return { error: "This team doesn't exist", status: 404, data: null }

	const user = await findByEmail(data.email)
	if (user)
		return { error: 'This email is already taken', status: 409, data: null }

	const salt = await bcrypt.genSalt()
	const hash = await bcrypt.hash(data.password, salt)

	const newUser = await createUser({
		teamId: data.teamId,
		displayName: data.displayName,
		email: data.email,
		password: hash,
		access: data.access ?? 'staff',
		phone: data.phone,
	})

	const { error, status } = await sendWelcomeEmail(newUser)

	if (error)
		return {
			error,
	 		status,
	 		data: null,
	}

	const response = await findByEmail(newUser.email)

	return { error: null, status: null, data: response }
}

export const registerTeam = async (
	data: Partial<Team>
): Promise<ServiceResponse<Partial<Team>>> => {
	const team = await findByName(data.name)
	if (team)
		return { error: 'This name is already taken', status: 409, data: null }

	const newTeam = await createTeam(data)

	return { error: null, status: null, data: newTeam }
}
