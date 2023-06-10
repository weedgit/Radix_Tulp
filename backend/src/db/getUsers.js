/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} User
 */
module.exports = async function (session) {
  const cypherQuery = `
  MATCH (p:Profile)
  RETURN p
      `;
  const result = await session.run(cypherQuery);
  //If no records in DB
  if (!result.records || !result.records[0]) {
    console.log(`users not found`);
    return null;
  }

  const Users = [];
  for (const record of result.records) {
    const node = record.get(0);
    Users.push(node.properties);
  }
  return Users;
};
