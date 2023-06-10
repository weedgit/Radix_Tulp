/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {object} data
 * @return {object} Follow
 */
module.exports = async function (session, id) {
  const cypherQuery = `
    MATCH(f:Follow{id:$id}) DETACH DELETE f
  `;
  const queryInput = {
    id,
  };
  const result = await session.run(cypherQuery, queryInput);
  return true;
};
