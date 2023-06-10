/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} User
 */
module.exports = async function(session, id) {
  const cypherQuery = `
      MATCH (u:User{id: $id})
      RETURN u
      `;
  const queryInput = { id };
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    console.log(`user not found ${id}`);
    return null;
  }

  const record = result.records[0];
  const node = record.get(0);
  return node.properties;
};
