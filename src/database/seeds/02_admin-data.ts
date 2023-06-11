import bcrypt from 'bcrypt'
import MigrationsRepository from '../migrations.config/MigrationsRepository'
import { initial_admin_password } from '../migrations.config/const'
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

	const salt = await bcrypt.genSalt()
	const hash = await bcrypt.hash(initial_admin_password, salt)

	const userAdmin1 = await repository.findOne<User>({
		where: { email: 'johnwayne@admin.fr' },
		select: userSafeFields,
	})

	if (!userAdmin1) {
		await repository.create({
			teamId: 1,
			displayName: 'John Wayne',
			email: 'johnwayne@admin.fr',
			password: hash,
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
			password: hash,
			access: 'admin',
			phone: '0708091011',
			createdAt: new Date(),
		})
	}
	return null
}
