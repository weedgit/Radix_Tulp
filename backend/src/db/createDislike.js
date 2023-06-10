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
    CREATE (dl:Dislike {
      id: $id,
      post_id: $data.post_id,
      disliked_by_id: $data.disliked_by_id,
      disliked_by_username: $data.disliked_by_username,
      createdAt: $createdAt
    })
  RETURN dl
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

  //Once a dislike is created, we will credit the post creator 5 Points as per BSD

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
  let creditedPoints = points + 5; // 5 POINTS ADDED HERE

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
  console.log(
    "8 Points added to user " + data.userID + " - ",
    updatedPointsResult
  );

  //Similarly, we will be subtracting 2 points for the user that disliked the post.

  //Fetch user points
  const getDislikingUserPointsInput = { userID: data.disliked_by_id };

  const dislikingUserPoints = await session.run(
    getUserPointsQuery,
    getDislikingUserPointsInput
  );
  if (!dislikingUserPoints.records || !dislikingUserPoints.records[0]) {
    throw Error("Error Creating Post Like");
  }
  const recordDislikingPoints = dislikingUserPoints.records[0];
  const dislikingPoints = parseFloat(recordDislikingPoints._fields[0]);
  let creditedDislikingPoints = dislikingPoints - 2; // 2 POINTS SUBTRACTED HERE

  //Now lets update the points to DB
  const updateDislikingUserPointsInput = {
    userID: data.disliked_by_id,
    creditedPoints: creditedDislikingPoints,
  };

  const updatedDislikingPoints = await session.run(
    updateUserPointsQuery,
    updateDislikingUserPointsInput
  );
  if (!updatedDislikingPoints.records || !updatedDislikingPoints.records[0]) {
    throw Error("Error Creating Post Like");
  }
  const recordUpdatedDislikingPoints = updatedDislikingPoints.records[0];
  const updatedDislikingPointsResult = parseFloat(recordUpdatedDislikingPoints._fields[0]);
  console.log(
    "2 Points SUBTRACTED from user " + data.disliked_by_id + " - ",
    updatedDislikingPointsResult
  );

  return post;
};
