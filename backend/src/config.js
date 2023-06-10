/**
 * Module dependencies.
 */

const config = {
  server: {
    port: process.env.SERVER_PORT,
  },
  cors: {
    credentials: true,
    origin: process.env.CORS_ALLOWED_LIST ?
      process.env.CORS_ALLOWED_LIST.split(',') :
      null,
  },
  neo4j: {
    connectionUrl: `${process.env.NEO4J_URI}`,
    username: process.env.NEO4J_USERNAME,
    password: process.env.NEO4J_PASSWORD,
    database: process.env.NEO4J_DATABASE,
  },
  API: {
    url: process.env.API_SERVICE_URL,
  },
};

/**
 * exports from the module
 */
module.exports = config;
