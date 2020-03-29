const knew = require('knex');
const configuration = require('../../knexfile');

const connection = knew(configuration.development)

module.exports = connection;