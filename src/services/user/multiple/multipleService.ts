import { findAllByQuery } from '../../../repositories/userRepository'
import { ServiceResponse } from 'src/types/Service'
import { User } from 'src/types/User'

export const fetchAll = async (): Promise<ServiceResponse<Partial<User[]>>> => {
	const users = await findAllByQuery({
		select: ['id', 'teamId', 'displayName', 'imageUrl', 'access', 'createdAt'],
	})

	return { error: null, status: null, data: users }
}
