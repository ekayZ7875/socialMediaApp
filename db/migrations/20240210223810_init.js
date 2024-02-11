/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('comments',(table)=>{
        table.string('id').primary()
        table.integer('user_id').notNullable().references('Users.id')
        table.integer('post_id').notNullable().references('posts.id')
        table.string('comments')
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable
  
};
