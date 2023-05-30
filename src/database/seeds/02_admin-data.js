import configuration from '../../config/configuration'
import MigrationsRepository from '../migrations.config/MigrationsRepository'

export const seed = async () => {
	// create admin user if it doesn't exist

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

	const userAdmin1 = await repository.findOne({
		where: { email: 'johnwayne@admin.fr' },
		select: userSafeFields,
	})

	if (!userAdmin1) {
		await repository.create({
			teamId: 1,
			displayName: 'John Wayne',
			email: 'johnwayne@admin.fr',
			password: configuration.initial_admin_password,
			access: 'admin',
			phone: '0607080910',
			createdAt: Date.now(),
		})
	}

	if (userAdmin1 && userAdmin1.access !== 'admin') {
		await repository.update(userAdmin1.id, {
			access: 'admin',
			displayName: 'John Wayne',
			email: 'johnwayne@admin.fr',
			updatedAt: Date.now(),
		})
	}

	const userAdmin2 = await repository.findOne({
		where: { email: 'chouchou@admin.fr' },
		select: userSafeFields,
	})

	if (!userAdmin2) {
		await repository.create({
			teamId: 2,
			displayName: 'Chouchou Beignet',
			email: 'chouchou@admin.fr',
			password: configuration.initial_admin_password,
			access: 'admin',
			phone: '0708091011',
			createdAt: Date.now(),
		})
	}
	return null
}
