/**
 * Module dependencies.
 */
const {v4: uuidv4} = require('uuid');

/**
 *
 * @param {object} session
 * @param {object} data
 * @return {object} Post Collection
 */
module.exports = async function(session, data) {

  const cypherQuery = `
    CREATE (c:Collection {
      id: $id,
      userId: $data.userId,
      banner_image: $data.banner_image,
      collection_name: $data.collection_name,
      description: $data.description,
      properties: $data.properties,
      collaborators: $data.collaborators,
      total_creator_earnings_percentage_fee: $data.total_creator_earnings_percentage_fee,
      payout_wallet_address: $data.payout_wallet_address,
      createdAt: $createdAt
    })

    WITH c
    MATCH(u:User) WHERE u.userId=$data.userId
    CREATE (c)-[:HAS_USER]->(u)
    CREATE (u)-[:USER_COLLECTION]->(c)
    RETURN c, u
  `;
  const queryInput = {
    id: uuidv4(),
    data,
    createdAt: new Date().toISOString(),
  };
  
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    throw Error('CREATE_COLLECTION_FAILED');
  }
  const record = result.records[0];
  const postNode = record.get(0);
  const post = postNode.properties;

  return post;
};
