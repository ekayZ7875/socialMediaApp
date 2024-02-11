/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('posts',(table)=>{
        table.increments('id').primary()
        table.integer('user_id').notNullable()
        table.string('cpation')
        table.string('image_url')

    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable
  
};
