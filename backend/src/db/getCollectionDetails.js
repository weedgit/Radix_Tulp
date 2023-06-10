/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} Collection by collectionId
 */

module.exports = async function (session, collectionId) {
  const cypherQuery = `
    MATCH (c:Collection{id: $collectionId})
    RETURN c
    `;
  const queryInput = { collectionId };
  
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    throw new Error("No user collection");
  }

  const record = result.records[0];
  const node = record.get(0);
  return node.properties;
};
