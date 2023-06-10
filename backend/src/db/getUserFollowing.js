/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} User following
 */
// MATCH (c:Collection{userId: $userId})
// RETURN c
module.exports = async function (session, followed_by_userId) {
  const cypherQuery = `
    MATCH (f:Follow{followed_by_userId: $followed_by_userId})
    RETURN f
    `;
  const queryInput = { followed_by_userId };
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    throw new Error("No user following");
  }

  const following = [];
  for (const record of result.records) {
    const node = record.get(0);
    following.push(node.properties);
  }
  return following;
};
