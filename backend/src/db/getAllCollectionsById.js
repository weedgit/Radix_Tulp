/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} Post Collection by userId
 */
// MATCH (c:Collection{userId: $userId})
// RETURN c
module.exports = async function (session, userId) {
    const cypherQuery = `
    MATCH (c:Collection)
    -[r:HAS_USER]->
    (u:User{userId: $userId})
    RETURN c
    `;
    const queryInput = { userId };
    const result = await session.run(cypherQuery, queryInput);
    if (!result.records || !result.records[0]) {
      throw new Error("No user collections");
    }
  
    const PostCollection = [];
    for (const record of result.records) {
      const node = record.get(0);
      PostCollection.push(node.properties);
    }
    return PostCollection;
  
  };
  