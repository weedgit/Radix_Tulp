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
      text: $data.text,
      image: $data.image,
      video: $data.video,
      link: $data.link,
      tags: $data.tags,
      price: $data.price,
      userId: $data.userId,
      username: $data.username,
      collectionId: $data.collectionId,
      collection_name: $data.collection_name,
      is_reblogged: $data.is_reblogged,
      post_owner_username: $data.post_owner_username,
      post_owner_userId: $data.post_owner_userId,
      createdAt: $createdAt
    })
    WITH p
    MATCH(u:User) WHERE u.userId=$data.userId
    CREATE (p)-[:HAS_USER]->(u)
    CREATE (u)-[:USER_POST]->(p)

    WITH DISTINCT p,u
    MATCH(c:Collection) WHERE c.id=$data.collectionId
    WITH DISTINCT p,u,c
    CREATE (p)-[:FROM_COLLECTION]->(c)
    CREATE (c)-[:HAS_POST]->(p)

    RETURN p, u
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
