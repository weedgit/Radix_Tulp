/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} User followers
 */

module.exports = async function (session, userId_followed) {
    const cypherQuery = `
      MATCH (f:Follow{userId_followed: $userId_followed})
      RETURN f
      `;
    const queryInput = { userId_followed };
    const result = await session.run(cypherQuery, queryInput);
    if (!result.records || !result.records[0]) {
      throw new Error("No user followers");
    }
  
    const followers = [];
    for (const record of result.records) {
      const node = record.get(0);
      followers.push(node.properties);
    }
    return followers;
  };
  