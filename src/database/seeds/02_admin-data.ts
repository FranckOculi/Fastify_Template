import MigrationsRepository from '../migrations.config/MigrationsRepository'
import { User } from 'src/types/user'

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

	const userAdmin1 = await repository.findOne<User>({
		where: { email: 'johnwayne@admin.fr' },
		select: userSafeFields,
	})

	if (!userAdmin1) {
		await repository.create({
			teamId: 1,
			displayName: 'John Wayne',
			email: 'johnwayne@admin.fr',
			password: 'admin',
			access: 'admin',
			phone: '0607080910',
			createdAt: new Date(),
		})
	}

	if (userAdmin1 && userAdmin1.access !== 'admin') {
		await repository.update(
			{ id: userAdmin1.id },
			{
				access: 'admin',
				displayName: 'John Wayne',
				email: 'johnwayne@admin.fr',
				updatedAt: new Date(),
			}
		)
	}

	const userAdmin2 = await repository.findOne<User>({
		where: { email: 'chouchou@admin.fr' },
		select: userSafeFields,
	})

	if (!userAdmin2) {
		await repository.create({
			teamId: 2,
			displayName: 'Chouchou Beignet',
			email: 'chouchou@admin.fr',
			password: 'admin',
			access: 'admin',
			phone: '0708091011',
			createdAt: new Date(),
		})
	}
	return null
}
