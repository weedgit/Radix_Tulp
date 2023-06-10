/**
 * Module dependencies.
 */
const { v4: uuidv4 } = require("uuid");

/**
 *
 * @param {object} session
 * @param {object} data
 * @return {object} Like
 */
module.exports = async function (session, data, user_id) {
  const cypherQuery = `
  MATCH (l:Like{id: $id})
  DETACH DELETE l
  `;
  const queryInput = {
    id: data,
  };
  const result = await session.run(cypherQuery, queryInput);

  //Once a like is removed, we will also remove credited points as per BSD

  //Fetch user points
  const getUserPointsQuery = `
  MATCH (u:User {userId:$userID}) RETURN u.points
`;

  const getUserPointsInput = { userID: user_id };

  const userPoints = await session.run(getUserPointsQuery, getUserPointsInput);
  if (!userPoints.records || !userPoints.records[0]) {
    throw Error("Error Creating Post Like");
  }
  const recordPoints = userPoints.records[0];
  const points = parseFloat(recordPoints._fields[0]);
  let creditedPoints = points - 8; // 8 POINTS SUBTRACTED HERE

  //Now lets update the points to DB

  const updateUserPointsQuery = `
MATCH (u:User {userId:$userID}) SET u.points = $creditedPoints RETURN u.points
`;

  const updateUserPointsInput = {
    userID: user_id,
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
    "8 Points REMOVED FROM user " + user_id + " - ",
    updatedPointsResult
  );
  return true;
};
