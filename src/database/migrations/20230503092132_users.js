import {Knex} from "knex"

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
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

/**
 * @param { Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTable('users')
}
