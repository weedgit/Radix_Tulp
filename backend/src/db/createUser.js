/**
 * Module dependencies.
 */
const { v4: uuidv4 } = require("uuid");
/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} User
 */
module.exports = async function (session, data) {
  const cypherQuery = `
      CREATE (u:User {
        id: $id,
        email:$email,
        userId: $userId,
        username: $username,
        password: $password,
        points: "0"
      })
    RETURN u
      `;
  const queryInput = {
    id: uuidv4(),
    email:data.email,
    userId: data.userId,
    username: data.username,
    password: data.password,
  };
  const result = await session.run(cypherQuery, queryInput);
  // console.log(JSON.stringify(result));
  if (!result.records || !result.records[0]) {
    throw new Error("USER_CREATION_FAILED");
  }

  const record = result.records[0];
  const node = record.get(0);
  return node.properties;
};
