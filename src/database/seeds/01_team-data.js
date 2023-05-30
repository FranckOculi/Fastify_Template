import MigrationsRepository from '../migrations.config/MigrationsRepository.js'

export const seed = async () => {
	// create team if it doesn't exist

	const repository = new MigrationsRepository('teams')
	const teamSafeFields = ['id', 'name', 'description', 'updatedAt', 'createdAt']

	const team1 = await repository.findOne({
		where: { id: 1 },
		select: teamSafeFields,
	})

	if (!team1) {
		await repository.create({
			id: 1,
			name: 'Team React',
			description: 'Groupe de travail',
			createdAt: Date.now(),
		})
	}

	const team2 = await repository.findOne({
		where: { id: 2 },
		select: teamSafeFields,
	})

	if (!team2) {
		await repository.create({
			id: 2,
			name: 'Groupe GitHub',
			description: 'Groupe de présentation des projets',
			createdAt: Date.now(),
		})
	}

	return null
}
