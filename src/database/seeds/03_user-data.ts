import bcrypt from 'bcrypt'
import MigrationsRepository from '../migrations.config/MigrationsRepository'
import { initial_user_password } from '../migrations.config/const'
import { User } from 'src/types/user'

export const seed = async () => {
	// create user if it doesn't exist

	const repository = new MigrationsRepository('users')
	const userSafeFields = [
		'id',
		'teamId',
		'displayName',
		'email',
		'phone',
		'access',
		'imageUrl',
		'updatedAt',
		'createdAt',
	]

	const salt = await bcrypt.genSalt()
	const hash = await bcrypt.hash(initial_user_password, salt)

	const user1 = await repository.findOne<User>({
		where: { email: 'a@a.com' },
		select: userSafeFields,
	})

	if (!user1)
		await repository.create({
			teamId: 1,
			displayName: 'John Doe',
			email: 'a@a.com',
			password: hash,
			access: 'manager',
			createdAt: new Date(),
		})

	const user2 = await repository.findOne<User>({
		where: { email: 'b@b.com' },
		select: userSafeFields,
	})

	if (!user2)
		await repository.create({
			teamId: 2,
			displayName: 'Jane Doe',
			email: 'b@b.com',
			password: hash,
			access: 'manager',
			createdAt: new Date(),
		})

	for (let i = 0; i < 5; i++) {
		const user = await repository.findOne<User>({
			where: { email: '`randomUser${i}@team1.com`' },
			select: userSafeFields,
		})

		if (!user)
			await repository.create({
				teamId: 1,
				displayName: `randomUser${i}_team1`,
				email: `randomUser${i}@team1.com`,
				password: hash,
				createdAt: new Date(),
			})
	}
	for (let i = 0; i < 5; i++) {
		const user = await repository.findOne<User>({
			where: { email: '`randomUser${i}@team2.com`' },
			select: userSafeFields,
		})

		if (!user)
			await repository.create({
				teamId: 2,
				displayName: `randomUser${i}_team2`,
				email: `randomUser${i}@team2.com`,
				password: hash,
				createdAt: new Date(),
			})
	}
}
