/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} Username
 * @return {object} User
 */
module.exports = async function (session, Username) {
  const cypherQuery = `
          MATCH (a:Admin{username: $Username})
          RETURN a
          `;
  const queryInput = { Username };
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    console.log(`user not found ${Username}`);
    return null;
  }

  const record = result.records[0];
  const node = record.get(0);
  return node.properties;
};
