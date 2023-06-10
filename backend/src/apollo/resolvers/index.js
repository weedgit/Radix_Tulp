/**
 * Module dependencies.
 */
const Query = require('./query');
const Mutation = require('./mutation');
const { DateTimeResolver, DateResolver } = require('./common');

/**
 * exports from the module
 */
module.exports = {
  DateTime: DateTimeResolver,
  Date: DateResolver,
  Query,
  Mutation,
};
