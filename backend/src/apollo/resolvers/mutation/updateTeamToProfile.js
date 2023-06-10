/**
 * Module dependencies.
 */
 const { updateTeamToProfile } = require('../../../db');

 /**
  * exports from the module
  * @param {*} _
  * @param {*} args
  * @param {*} context
  */
 module.exports = async (_, args, context) => {
   const { neo4jDriver } = context;
   const session = neo4jDriver.session();
   try {
     const { type, data } = args;
    //  console.log("data1", data);
     const profile = await updateTeamToProfile(session, type, data);
 
     return profile;
   } catch (e) {
     console.log(e);
     if (e.code === 'Neo.ClientError.Schema.ConstraintValidationFailed') {
       throw new Error('UNABLE TO UPDATE TEAM TO PROFILE');
     }
     throw e;
   } finally {
     await session.close();
   }
 };
 