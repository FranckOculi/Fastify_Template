import configuration from '../../config/configuration'

import MigrationsRepository from '../migrations.config/MigrationsRepository'

export const seed = async () => {
	if (configuration.env === 'production') {
		return false
	}

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

	const user1 = await repository.findOne({
		where: { email: 'a@a.com' },
		select: userSafeFields,
	})

	if (!user1)
		await repository.create({
			teamId: 1,
			displayName: 'John Doe',
			email: 'a@a.com',
			password: configuration.initial_user_password,
			access: 'manager',
			createdAt: Date.now(),
		})

	const user2 = await repository.findOne({
		where: { email: 'b@b.com' },
		select: userSafeFields,
	})

	if (!user2)
		await repository.create({
			teamId: 2,
			displayName: 'Jane Doe',
			email: 'b@b.com',
			password: configuration.initial_user_password,
			access: 'manager',
			createdAt: Date.now(),
		})

	for (let i = 0; i < 5; i++) {
		const user = await repository.findOne({
			where: { email: '`randomUser${i}@team1.com`' },
			select: userSafeFields,
		})

		if (!user)
			await repository.create({
				teamId: 1,
				displayName: `randomUser${i}_team1`,
				email: `randomUser${i}@team1.com`,
				password: configuration.initial_user_password,
				createdAt: Date.now(),
			})
	}
	for (let i = 0; i < 5; i++) {
		const user = await repository.findOne({
			where: { email: '`randomUser${i}@team2.com`' },
			select: userSafeFields,
		})

		if (!user)
			await repository.create({
				teamId: 2,
				displayName: `randomUser${i}_team2`,
				email: `randomUser${i}@team2.com`,
				password: configuration.initial_user_password,
				createdAt: Date.now(),
			})
	}
}
