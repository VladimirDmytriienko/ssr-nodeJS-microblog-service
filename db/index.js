const knexLib = require('knex');
const knex = knexLib(
    require('../knexfile')[process.env.NODE_ENV]
);

module.exports = {
    knex,
};