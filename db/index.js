const knexLib = require('knex');

// initializing generic connection to our DB
const knex = knexLib(
    require('../knexfile')
);

module.exports = {
    knex,
};