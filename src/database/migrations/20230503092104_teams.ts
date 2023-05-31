import { Knex } from 'knex'

export function up(knex: Knex) {
	return knex.schema.createTable('teams', (t) => {
		t.increments('id').unsigned().primary()
		t.string('name').notNullable()
		t.text('description').nullable()
		t.dateTime('createdAt').notNullable()
		t.dateTime('updatedAt').nullable()
		t.dateTime('deletedAt').nullable()
	})
}

export function down(knex: Knex) {
	return knex.schema.dropTable('teams')
}
