/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} Posts by Collection Id
 */

module.exports = async function (session, collectionId) {
    const cypherQuery = `
    MATCH (p:Post{collectionId: $collectionId})
    RETURN p
    `;
    const queryInput = { collectionId };
    const result = await session.run(cypherQuery, queryInput);
    if (!result.records || !result.records[0]) {
      throw new Error("No user collections");
    }
  
    const Posts = [];
    for (const record of result.records) {
      const node = record.get(0);
      Posts.push(node.properties);
    }
    return Posts;
  
  };
  