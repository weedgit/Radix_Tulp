/**
 * Module dependencies.
 */
const { getLikesDislikesByPostId } = require("../../../db");

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
    const { post_id } = args;
    if (!post_id) {
      throw new Error(`Invalid Token`);
    }
    const likesDislikes = await getLikesDislikesByPostId(session, post_id);
    return likesDislikes;
  } catch (e) {
    console.log(e);
    throw e;
  } finally {
    await session.close();
  }
};
