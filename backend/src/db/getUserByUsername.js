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
        MATCH (u:User{username: $Username})
        RETURN u
        `;
  const queryInput = { Username };
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    //Fallback method to check user existance via querying user's email address
    const cypherQueryEmail = `
      MATCH (u:User{email: $Username})
      RETURN u
  `;
    const queryInputEmail = { Username };
    const result = await session.run(cypherQueryEmail, queryInputEmail);
    if (!result.records || !result.records[0]) {
      console.log(`user not found ${Username}`);
      return null;
    }

    const record = result.records[0];
    const node = record.get(0);
    return node.properties;
  }

  const record = result.records[0];
  const node = record.get(0);
  return node.properties;
};
