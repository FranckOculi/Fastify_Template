import { registerTeam, registerUser } from './registerService'
import { findByEmail, removeUser } from '../../../repositories/userRepository'
import { findByName, removeTeam } from '../../../repositories/teamRepository'
import { User } from '../../../types/user'
import { Team } from '../../../types/team'

describe('registerService', () => {
	const newUser = {
		teamId: 2,
		displayName: 'new-user_registerService',
		email: `new-user_registerService@test.com`,
		password: 'new-user',
	}

	const newUserError = {
		teamId: 1,
		displayName: 'John Wayne',
		email: `johnwayne@admin.fr`,
		password: 'user',
	}

	const newTeam = {
		id: 3,
		name: 'new-team_registerService',
		description: 'new-team',
	}

	const newTeamError = {
		id: 1,
		name: 'Team React',
		description: 'Groupe de travail',
	}

	beforeEach(async () => {
		const user = <User>await findByEmail(newUser.email)
		const team = <Team>await findByName(newTeam.name)

		if (user) await removeUser(user.id)
		if (team) await removeTeam(team.id)
	})

	describe('registerUser', () => {
		it("should return an error when team doesn't exist", async () => {
			const { error, status, data } = await registerUser({
				...newUserError,
				teamId: 3,
			})

			expect(status).toBe(404)
			expect(error).toBe("This team doesn't exist")
		})

		it('should return an error when email is already taken', async () => {
			const { error, status, data } = await registerUser(newUserError)

			expect(status).toBe(409)
			expect(error).toBe('This email is already taken')
		})

		it('should succeed', async () => {
			const { error, status, data } = await registerUser(newUser)

			expect(error).toBeNull()
			expect(data.displayName).toBe(newUser.displayName)
		})
	})

	describe('registerTeam', () => {
		it('should return an error when team already exist', async () => {
			const { error, status, data } = await registerTeam(newTeamError)

			expect(status).toBe(409)
			expect(error).toBe('This name is already taken')
		})

		it('should succeed', async () => {
			const { error, status, data } = await registerTeam(newTeam)

			expect(error).toBeNull()
			expect(data.name).toBe(newTeam.name)
		})
	})
})
