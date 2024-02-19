/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('messages',(table)=>{
    table.increments('id').primary()
    table.integer('sender_id').notNullable()
    table.integer('receiver_id').notNullable()
    table.string('messages')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('messages')
  
};
