/**
 * Module dependencies.
 */
const { v4: uuidv4 } = require("uuid");

/**
 *
 * @param {object} session
 * @param {object} data
 * @return {object} user profile
 */
module.exports = async function (session, data) {
  const cypherQuery = `
      CREATE (p:Profile {
          id: $id,
          userId: $userId,
          username: $username,
          name: $name,
          avatar: $avatar,
          description: $description,
          website: $website,
          phone: $phone,
          inbox_everyone: $inbox_everyone,
          n_followers: $n_followers,
          n_messages: $n_messages,
          n_tulpUpdates: $n_tulpUpdates,
          dark_theme: $dark_theme,
          user_points: 0
        })
      WITH p
      MATCH(u:User) WHERE u.userId=$userId
      CREATE (p)-[:OWNED_BY]->(u)
      CREATE (u)-[:HAS_ACCOUNT]->(p)
      RETURN p
      `;

  const existanceQuery = `
  MATCH (p:Profile) WHERE p.userId=$userId
  RETURN p
      `;
  const updateQuery = `
  MATCH (p:Profile {userId: $userId}) 
  SET p += { 
    name: $name ,
    avatar: $avatar,
    description: $description,
    website : $website,
    phone : $phone,
    inbox_everyone : $inbox_everyone,
    n_followers : $n_followers,
    n_messages : $n_messages,
    n_tulpUpdates : $n_tulpUpdates,
    dark_theme : $dark_theme
  }
  RETURN p
      `;
  const queryInput = {
    id: uuidv4(),
    userId: data.userId,
    username: data.username,
    name: data.name,
    avatar: data.avatar,
    description: data.description,
    website: data.website,
    phone: data.phone,
    inbox_everyone: data.inbox_everyone ? data.inbox_everyone : false,
    n_followers: data.n_followers ? data.n_followers : false,
    n_messages: data.n_messages ? data.n_messages : false,
    n_tulpUpdates: data.n_tulpUpdates ? data.n_tulpUpdates : false,
    dark_theme: data.dark_theme ? data.dark_theme : false,
  };

  //First Check if profile already exists
  const checkExistance = await session.run(existanceQuery, queryInput);

  if (!checkExistance.records || !checkExistance.records[0]) {
    //Means profile doesnt exist, so we will create a new one here
    const result = await session.run(cypherQuery, queryInput);
    if (!result.records || !result.records[0]) {
      return new Error("PROFILE_CREATION_FAILED");
    }

    const record = result.records[0];
    const node = record.get(0);
    return node.properties;
  } else {
    //Update data to existing profile
    const updateResult = await session.run(updateQuery, queryInput);
    if (!updateResult.records || !updateResult.records[0]) {
      return new Error("PROFILE_UPDATION_FAILED");
    }

    const record = updateResult.records[0];
    const node = record.get(0);
    return node.properties;
  }
};
