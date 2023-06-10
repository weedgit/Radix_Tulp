/**
 * Module dependencies.
 */
const { gql } = require('apollo-server-express');
const fs = require('fs');
const path = require('path');

/**
 * exports from the module
 */
module.exports = gql(
    fs.readFileSync(path.join(__dirname, 'schema.gql'), 'utf8'),
);
