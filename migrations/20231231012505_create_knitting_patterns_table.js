/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("knitting_patterns", (table) => {
    table.increments("id").primary();
    table.float("price").notNullable();
    table.string("description").notNullable();
    table.string("color").notNullable();
    table.string("currency").notNullable();
    table.string("fiber_type").notNullable();
    table.string("image").notNullable();
    table.string("name").notNullable();
    table.string("skill_level").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("knitting_patterns");
};
