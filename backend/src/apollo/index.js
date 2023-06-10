/**
 * Module dependencies.
 */
const { buildFederatedSchema } = require('@apollo/federation');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const db = require('../db');

/**
 * exports from the module
 * @param {*} app
 *
 */
module.exports = async function(app) {
  const neo4jDriver = await db.init();
  const schema = buildFederatedSchema([{ typeDefs, resolvers }]);
  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const authUserHeader =
        req.headers.authUser || req.headers.authuser || null;
      const authUser = authUserHeader ? JSON.parse(authUserHeader) : null;
      return { neo4jDriver, authUser };
    },
    introspection: true,
    playground: true,
  });
  server.applyMiddleware({ app });
};
