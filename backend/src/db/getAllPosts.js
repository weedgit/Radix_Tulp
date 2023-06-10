/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} Posts
 */
module.exports = async function (session) {
  const cypherQuery = `
    MATCH (p:Post)
    RETURN p
        `;
  const result = await session.run(cypherQuery);
  //If no records in DB
  if (!result.records || !result.records[0]) {
    console.log(`Posts not found`);
    return null;
  }

  const Posts = [];
  for (const record of result.records) {
    const node = record.get(0);
    Posts.push(node.properties);
  }
  return Posts;
};
