/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} Post Collection
 */
module.exports = async function (session) {
  const cypherQuery = `
    MATCH (c:Collection)
    RETURN c
        `;
  const result = await session.run(cypherQuery);
  //If no records in DB
  if (!result.records || !result.records[0]) {
    console.log(`Collection not found`);
    return null;
  }

  const PostCollection = [];
  for (const record of result.records) {
    const node = record.get(0);
    PostCollection.push(node.properties);
  }
  return PostCollection;
};
