import {
	getUserService,
	updateUserService,
	deleteUserService,
} from './singleService'

import { registerUser } from '../../auth/register/registerService'
import { findByEmail } from '../../../repositories/userRepository'
import { removeUser } from '../../../repositories/userRepository'
import { User } from '../../../types/user'

describe('singleService', () => {
	let user

	const newUser = {
		teamId: 2,
		displayName: 'new-user',
		email: `new-user@test.com`,
		password: 'new-user',
	}

	beforeEach(async () => {
		const { error, data } = await registerUser(newUser)
		if (error) {
			user = <User>await findByEmail(newUser.email)
		} else {
			user = data as User
		}
	})

	afterAll(async () => {
		const userWithId = <User>await findByEmail(newUser.email)

		if (userWithId) await removeUser(userWithId.id)
	})

	const fakeId = 9999

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

			expect(data).toBeNull()
			expect(error).toBeNull()

			const deleteUser = await getUserService(user.id)

			expect(deleteUser.error).toBe("This user doesn't exist")
		})
	})
})
