/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('articles', (table) => {
        table.increments();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('id').inTable('users'); 
        table.text('text').notNullable(); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('articles');
};
