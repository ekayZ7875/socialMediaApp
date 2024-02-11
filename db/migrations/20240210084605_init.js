/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('Users',(table)=>{
        table.increments('id').primary()
        table.string('Username').unique().notNullable()
        table.string('Password').notNullable()
        table.string('email').notNullable().unique()
        table.string('Bio')
        table.string('profile_picture_url')
    })  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable
  
};
