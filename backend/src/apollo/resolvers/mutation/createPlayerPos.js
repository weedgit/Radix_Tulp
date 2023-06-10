/**
 * Module dependencies.
 */
const {createPlayerPos} = require('../../../db');

/**
 * exports from the module
 * @param {*} obj
 * @param {*} args
 * @param {*} context
 */
module.exports = async (obj, args, context) => {
  const {neo4jDriver} = context;
  const session = neo4jDriver.session();
  try {
    const {position} = args;
    const playerPosition = await createPlayerPos(session, position);
    return playerPosition;
  } catch (e) {
    console.log(e);
    if (e.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
      throw new Error('PLAYER_POSITION_EXISTS');
    }
    throw e;
  } finally {
    await session.close();
  }
};
