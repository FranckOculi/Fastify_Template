/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable('teams', (t) => {
		t.increments('id').unsigned().primary()
		t.string('name').notNullable()
		t.text('description').nullable()
		t.dateTime('createdAt').notNullable()
		t.dateTime('updatedAt').nullable()
		t.dateTime('deletedAt').nullable()
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTable('teams')
}
