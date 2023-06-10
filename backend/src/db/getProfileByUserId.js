/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} username
 * @return {object} user profile
 */
module.exports = async function (session, userId) {
  const cypherQuery = `
  MATCH (p:Profile{userId: $userId})
  RETURN p
  `;
  const queryInput = { userId };
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    return false;
    // throw new Error("No user profile");
  }
  const record = result.records[0];
  const node = record.get(0);
  console.log("Node", node.properties);
  return node.properties;
};
