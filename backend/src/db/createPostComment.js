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
    CREATE (p:Post {
      id: $id,
      comment_on_post_id: $data.post_id,
      comment_on_post_parent_id: $data.parent_post_id,
      comment_on_post_userId: $data.post_userId,
      comment_on_post_username: $data.post_username,
      text: $data.text,
      image: $data.image,
      video: $data.video,
      link: $data.link,
      tags: $data.tags,
      userId: $data.userId,
      username: $data.username,
      collectionId: $data.collectionId,
      createdAt: $createdAt
    })
    WITH p
    MATCH(u:User) WHERE u.userId=$data.userId

    CREATE (p)-[:HAS_USER]->(u)
    CREATE (u)-[:USER_POST_COMMENT]->(p)

    WITH DISTINCT p,u

    MATCH(op:Post) WHERE op.id=$data.post_id

    WITH DISTINCT p, u, op

    CREATE (p)-[:HAS_POST]->(op)
    CREATE (op)-[:IS_COMMENT]->(p)

    RETURN p, u, op
  `;
  const queryInput = {
    id: uuidv4(),
    data,
    createdAt: new Date().toISOString(),
  };
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    throw Error("Error Creating Post");
  }
  const record = result.records[0];
  const postNode = record.get(0);
  const post = postNode.properties;

  return post;
};
