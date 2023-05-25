import { findAllByQuery } from '../../../repositories/userRepository.js'

export const fetchAll = async () => {
	const users = await findAllByQuery({
		select: ['id', 'teamId', 'displayName', 'imageUrl', 'access', 'createdAt'],
	})

	return { error: null, data: users }
}
