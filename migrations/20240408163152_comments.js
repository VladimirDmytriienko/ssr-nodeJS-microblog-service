/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('comments', (table) => {
        table.increments();
        table.integer('article_id').unsigned().notNullable();
        table.foreign('article_id').references('id').inTable('articles');
        table.text('text').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('comments');
};
