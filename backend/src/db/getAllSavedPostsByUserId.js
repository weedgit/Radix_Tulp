/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} Saved posts by userId
 */

module.exports = async function (session, userId) {
    const cypherQuery = `
      MATCH (s:Saved {saved_by_id: $userId})
      RETURN s
      `;
    const queryInput = { userId };
    const result = await session.run(cypherQuery, queryInput);
    if (!result.records || !result.records[0]) {
      throw new Error("No saved posts");
    }
  
    const savedPosts = [];
    for (const record of result.records) {
      const node = record.get(0);
      savedPosts.push(node.properties);
    }
    return savedPosts;
  };
  