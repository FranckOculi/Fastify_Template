import { Knex } from 'knex'

export function up(knex: Knex) {
	return knex.schema.createTable('users', (t) => {
		t.increments('id').unsigned().primary()
		t.integer('teamId').unsigned()
		t.foreign('teamId').references('id').inTable('teams')
		t.string('displayName').nullable()
		t.string('email').notNullable()
		t.string('password').nullable()
		t.string('phone').nullable()
		t.string('imageUrl').nullable()
		t.boolean('access').notNullable().defaultTo('staff')
		t.dateTime('createdAt').notNullable()
		t.dateTime('updatedAt').nullable()
		t.dateTime('deletedAt').nullable()
	})
}

export function down(knex: Knex) {
	return knex.schema.dropTable('users')
}
