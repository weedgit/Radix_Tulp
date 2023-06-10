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
    CREATE (l:Like {
      id: $id,
      post_id: $data.post_id,
      liked_by_id: $data.liked_by_id,
      liked_by_username: $data.liked_by_username,
      createdAt: $createdAt
    })
  RETURN l
  `;
  const queryInput = {
    id: uuidv4(),
    data,
    createdAt: new Date().toISOString(),
  };
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    throw Error("Error Creating Post Like");
  }
  const record = result.records[0];
  const postNode = record.get(0);
  const post = postNode.properties;

  //Once a like is created, we will credit the post creator 8 Points as per BSD

  //Fetch user points
  const getUserPointsQuery = `
    MATCH (u:User {userId:$userID}) RETURN u.points
  `;

  const getUserPointsInput = { userID: data.user_id };

  const userPoints = await session.run(getUserPointsQuery, getUserPointsInput);
  if (!userPoints.records || !userPoints.records[0]) {
    throw Error("Error Creating Post Like");
  }
  const recordPoints = userPoints.records[0];
  const points = parseFloat(recordPoints._fields[0]);
  let creditedPoints = points + 8; // 8 POINTS ADDED HERE

  //Now lets update the points to DB

  const updateUserPointsQuery = `
  MATCH (u:User {userId:$userID}) SET u.points = $creditedPoints RETURN u.points
`;

  const updateUserPointsInput = {
    userID: data.user_id,
    creditedPoints: creditedPoints,
  };

  const updatedPoints = await session.run(
    updateUserPointsQuery,
    updateUserPointsInput
  );
  if (!updatedPoints.records || !updatedPoints.records[0]) {
    throw Error("Error Creating Post Like");
  }
  const recordUpdatedPoints = updatedPoints.records[0];
  const updatedPointsResult = parseFloat(recordUpdatedPoints._fields[0]);
  console.log("8 Points added to user " + data.userID+ " - ", updatedPointsResult);

  return post;
};