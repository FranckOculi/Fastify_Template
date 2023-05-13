export function up(knex) {
  return knex.schema.createTable("teams", (t) => {
    t.increments("id").unsigned().primary();
    t.string("name").notNullable();
    t.text("description").nullable();
    t.dateTime("createdAt").notNullable();
    t.dateTime("updatedAt").nullable();
    t.dateTime("deletedAt").nullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable("teams");
}
