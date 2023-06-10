/**
 * Module dependencies.
 */

const config = require("../../../config");
const { createProfile } = require("../../../db");

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
    const { data } = args;
    const profile = await createProfile(session, data);
    return profile;
  } catch (e) {
    console.log(e);
    if (e.code === "Neo.ClientError.Schema.ConstraintValidationFailed") {
      throw new Error("PROFILE_EXISTS");
    }
    throw e;
  } finally {
    await session.close();
  }
};
