/**
 * Module dependencies.
 */
const { v4: uuidv4 } = require("uuid");

/**
 *
 * @param {object} session
 * @param {object} data
 * @return {object} Saved Post
 */
module.exports = async function (session, data) {
  const cypherQuery = `
    CREATE (s:Saved {
      id: $id,
      post_id: $data.post_id,
      saved_by_id: $data.saved_by_id,
      saved_by_username: $data.saved_by_username,
      createdAt: $createdAt
    })
  RETURN s
  `;
  const queryInput = {
    id: uuidv4(),
    data,
    createdAt: new Date().toISOString(),
  };
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    throw Error("Error Creating Post Save");
  }
  const record = result.records[0];
  const postNode = record.get(0);
  const post = postNode.properties; 

  return post;
};