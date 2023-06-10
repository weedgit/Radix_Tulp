/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} username
 * @return {object} user profile
 */
module.exports = async function (session, username) {
  const cypherQuery = `
  MATCH (p:Profile{username: $username})
  RETURN p
  `;
  const queryInput = { username };
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    throw new Error("No user profile");
  }
  const record = result.records[0];
  const node = record.get(0);
  console.log("Node", node.properties);
  return node.properties;
};
