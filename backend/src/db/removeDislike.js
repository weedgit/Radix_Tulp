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
module.exports = async function (session, id, userID, disliked_by_id) {
  const cypherQuery = `
  MATCH (dl:Dislike{id: $id})
  DETACH DELETE dl
  `;
  const queryInput = {
    id: id
  };
  const result = await session.run(cypherQuery, queryInput);


  //Once a dislike is removed, we will subtract the post creator 5 Points as per BSD

  //Fetch user points
  const getUserPointsQuery = `
    MATCH (u:User {userId:$userID}) RETURN u.points
  `;

  const getUserPointsInput = { userID: userID };

  const userPoints = await session.run(getUserPointsQuery, getUserPointsInput);
  if (!userPoints.records || !userPoints.records[0]) {
    throw Error("Error Creating Post DisLike");
  }
  const recordPoints = userPoints.records[0];
  const points = parseFloat(recordPoints._fields[0]);
  let creditedPoints = points - 5; // 5 POINTS SUBTRACTED HERE

  //Now lets update the points to DB

  const updateUserPointsQuery = `
  MATCH (u:User {userId:$userID}) SET u.points = $creditedPoints RETURN u.points
`;

  const updateUserPointsInput = {
    userID: userID,
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
    "5 Points subtracted from user " + userID + " - ",
    updatedPointsResult
  );

  //Similarly, we will be adding back 2 points for the user that disliked the post.

  //Fetch user points
  const getDislikingUserPointsInput = { userID: disliked_by_id };

  const dislikingUserPoints = await session.run(
    getUserPointsQuery,
    getDislikingUserPointsInput
  );
  if (!dislikingUserPoints.records || !dislikingUserPoints.records[0]) {
    throw Error("Error removing Post DisLike");
  }
  const recordDislikingPoints = dislikingUserPoints.records[0];
  const dislikingPoints = parseFloat(recordDislikingPoints._fields[0]);
  let creditedDislikingPoints = dislikingPoints + 2; // 2 POINTS ADDED BACK HERE

  //Now lets update the points to DB
  const updateDislikingUserPointsInput = {
    userID: disliked_by_id,
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
    "2 Points SUBTRACTED from user " + disliked_by_id + " - ",
    updatedDislikingPointsResult
  );


  return true;
};
