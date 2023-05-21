import {
	getUserService,
	updateUserService,
	deleteUserService,
} from './singleService'

import { registerUser } from '../../auth/register/registerService'
import { findByEmail } from '../../../repositories/userRepository'

describe('singleService', () => {
	let user
	const newUser = {
		teamId: 2,
		displayName: 'new-user',
		email: `new-user@test.com`,
		password: 'new-user',
	}

	beforeEach(async () => {
		user = await registerUser(newUser)
		if (user.error) {
			user = await findByEmail(newUser.email)
		}
	})

	const fakeId = 25

	describe('getUserService', () => {
		it('should return an error when no user', async () => {
			const { error, status, data } = await getUserService(fakeId)

			expect(status).toBe(404)
			expect(error).toBe("This user doesn't exist")
		})
		it('should succeed', async () => {
			const { error, status, data } = await getUserService(user.id)

			expect(data.id).toBe(user.id)
		})
	})

	describe('updateUserService', () => {
		const newData = {
			phone: '0708091012',
		}
		it('should return an error when no user', async () => {
			const { error, status, data } = await updateUserService(fakeId, newData)

			expect(status).toBe(404)
			expect(error).toBe("This user doesn't exist")
		})
		it('should succeed', async () => {
			const { error, status, data } = await updateUserService(user.id, newData)

			expect(data.phone).toBe(newData.phone)
		})
	})

	describe('deleteUserService', () => {
		it('should return an error when no user', async () => {
			const { error, status, data } = await deleteUserService(fakeId)

			expect(status).toBe(404)
			expect(error).toBe("This user doesn't exist")
		})
		it('should succeed', async () => {
			const { error, status, data } = await deleteUserService(user.id)
			const deleteUser = await findByEmail(newUser.email)

			expect(data).toBeNull()
			expect(error).toBeNull()
			expect(deleteUser).toBeUndefined()
		})
	})
})
