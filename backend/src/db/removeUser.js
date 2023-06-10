/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {object} data
 * @return {object} REMOVE USER. VERY SENSITIVE QUERY.
 */
module.exports = async function (session, userId) {
    const deleteUser = `
      MATCH(u:User{userId:$userId}) DETACH DELETE u
    `;
    const deleteProfile = `
      MATCH(p:Profile{userId:$userId}) DETACH DELETE p
    `;
    const queryInput = {
        userId,
    };
    const removeUser = await session.run(deleteUser, queryInput);
    const removeProfile = await session.run(deleteProfile, queryInput);
    return true;
  };
  