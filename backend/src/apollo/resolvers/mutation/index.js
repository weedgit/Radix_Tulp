/**
 * Module dependencies.
 */
const createProfile = require("./createProfile");
const createUser = require("./createUser");
const getUserByUsername = require("./getUserByUsername");
const getProfileByUserId = require("./getProfileByUserId");
const createPostCollection = require("./createPostCollection");
const createPost = require("./createPost");
const createSavePost = require("./createSavePost");
const getAllSavedPostsByUserId = require("./getAllSavedPostsByUserId");
const createPostComment = require("./createPostComment");
const getAllCollectionsById = require("./getAllCollectionsById");
const getCollectionDetails = require("./getCollectionDetails");
const getPostsCommentsById = require("./getPostsCommentsById");
const getPostsByCollectionId = require("./getPostsByCollectionId");
const createLike = require("./createLike");
const createDislike = require("./createDislike");
const removeLike = require("./removeLike");
const removeDislike = require("./removeDislike");
const getLikesDislikesByPostId = require("./getLikesDislikesByPostId");
const createUserFollowing = require("./createUserFollowing");
const removeUserFollowing = require("./removeUserFollowing");
const getUserFollowing = require("./getUserFollowing");
const getUserFollowers = require("./getUserFollowers");
const getAdminUserByUsername = require("./getAdminUserByUsername");
//DELETE MUTATIONS
const removeUser = require("./removeUser");
const removePost = require("./removePost");
const removeCollection = require("./removeCollection");

/**
 * exports from the module
 */
module.exports = {
  createUser,
  getUserByUsername,
  getAllCollectionsById,
  getCollectionDetails,
  createProfile,
  getProfileByUserId,
  createPostCollection,
  createPost,
  createSavePost,
  getAllSavedPostsByUserId,
  createPostComment,
  getPostsCommentsById,
  getPostsByCollectionId,
  createLike,
  createDislike,
  removeLike,
  removeDislike,
  getLikesDislikesByPostId,
  createUserFollowing,
  removeUserFollowing,
  getUserFollowing,
  getUserFollowers,
  getAdminUserByUsername,
  removeUser,
  removePost,
  removeCollection,
};
