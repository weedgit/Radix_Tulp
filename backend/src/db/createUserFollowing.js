/**
 * Module dependencies.
 */
const { v4: uuidv4 } = require("uuid");

/**
 *
 * @param {object} session
 * @param {object} data
 * @return {object} Post
 */
module.exports = async function (session, data) {
  const cypherQuery = `
    CREATE (f:Follow {
      id: $id,
      userId_followed: $data.userId_followed,
      username_followed: $data.username_followed,
      followed_by_userId: $data.followed_by_userId,
      followed_by_username: $data.followed_by_username,
      createdAt: $createdAt
    })
    WITH f
    MATCH(u:User) WHERE u.userId=$data.userId_followed
    CREATE (f)-[:FOLLOWS]->(u)

    RETURN f, u
  `;
  const queryInput = {
    id: uuidv4(),
    data,
    createdAt: new Date().toISOString(),
  };
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    throw Error("Error Creating Following");
  }
  const record = result.records[0];
  const postNode = record.get(0);
  const follow = postNode.properties;

  return follow;
};
