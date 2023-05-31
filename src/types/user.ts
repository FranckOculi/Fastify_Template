export type User = {
	id: number
	teamId: number
	displayName: string
	email: string
	password: string
	access?: string
	phone?: string
	imageUrl?: string
	createdAt: Date
	updatedAt?: Date
	deletedAt?: Date
}
