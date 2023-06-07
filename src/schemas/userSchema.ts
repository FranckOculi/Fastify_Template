const bodyJsonSchemaUpdate = {
	type: 'object',
	properties: {
		teamId: { type: 'number' },
		displayName: { type: 'string', minLength: 5, maxLength: 25 },
		email: { type: 'string', maxLength: 50 },
		password: { type: 'string', maxLength: 50 },
		phone: { type: 'string', minLength: 10, maxLength: 10 },
		imageUrl: { type: 'string', maxLength: 80 },
	},
}

const paramsJsonSchema = {
	type: 'object',
	required: ['id'],
	properties: {
		id: { type: 'number' },
	},
}

export const getUserSchema = {
	params: paramsJsonSchema,
}

export const deleteUserSchema = {
	params: paramsJsonSchema,
}

export const updateUserSchema = {
	body: bodyJsonSchemaUpdate,
	params: paramsJsonSchema,
}
