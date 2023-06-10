/**
 * Module dependencies.
 */
const { getAllPosts } = require("../../../db");
const config = require("../../../config");
const neo4j = require("neo4j-driver");

/**
 * exports from the module
 * @param {*} _
 * @param {*} args
 * @param {*} context
 */
module.exports = async (_, args, context) => {
  const neo4jDriver = neo4j.driver(
    config.neo4j.connectionUrl,
    neo4j.auth.basic(config.neo4j.username, config.neo4j.password)
  );
  const session = neo4jDriver.session({
    database: config.neo4j.database,
  });
  try {
    return await getAllPosts(session, args);
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    await session.close();
  }
};
