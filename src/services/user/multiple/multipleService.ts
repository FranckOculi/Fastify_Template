import { findAllByQuery } from '../../../repositories/userRepository'
import { ServiceResponse } from '../../../types/service'
import { User } from '../../../types/user'

export const fetchAll = async (): Promise<ServiceResponse<Partial<User[]>>> => {
	const users = await findAllByQuery({
		select: ['id', 'teamId', 'displayName', 'imageUrl', 'access', 'createdAt'],
	})

	return { error: null, status: null, data: users }
}
