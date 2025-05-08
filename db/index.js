const knexLib = require('knex');
const knex = knexLib(
    require('../knexfile')
);

module.exports = {
    knex,
};