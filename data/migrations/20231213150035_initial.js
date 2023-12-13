
exports.up = function(knex) {
  return knex.schema.createTable('recipes', tbl => {
    tbl.increments('recipe_id')
    tbl.string('name')
      .unique()
      .notNullable()
    tbl.datetime('created_at')
      .defaultTo(knex.fn.now())
  })
  .createTable('steps', tbl => {
    tbl.increments('step_id')
    tbl.integer('step_number')
      .notNullable()
      .unsigned() // forces number to be positive
    tbl.string('instructions')
      .notNullable()
    tbl.integer('recipe_id')
      .unsigned()
      .notNullable()
      .references('recipe_id')
      .inTable('recipes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
  })
  .createTable('ingredients', tbl => {
    tbl.increments('ingredient_id')
    tbl.string('ingredient_name')
      .notNullable()
    tbl.string('qty')
      .notNullable()
    tbl.integer('step_id')
      .unsigned()
      .notNullable()
      .references('step_id')
      .inTable('steps')
      .onUpdate('CASCADE')
      .onDelete('CASCADE') // Will update/delete this record if associated foreign records are updated/deleted.
  })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('recipes')
};
