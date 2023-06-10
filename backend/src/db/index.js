/**
 * Module dependencies.
 */

const createProfile = require("./createProfile");
const createUser = require("./createUser");
const getProfileByUserId = require("./getProfileByUserId");
const getAllUsers = require("./getUsers");
const getAllPosts = require("./getAllPosts");
const getAllPostCollection = require("./getAllPostCollection");
const createPostCollection = require("./createPostCollection");
const createPost = require("./createPost");
const createSavePost = require("./createSavePost");
const createPostComment = require("./createPostComment");
const getPostsCommentsById = require("./getPostsCommentsById");
const getUserByUsername = require("./getUserByUsername");
const getAllCollectionsById = require("./getAllCollectionsById");
const getCollectionDetails = require("./getCollectionDetails");
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
const removeUser = require("./removeUser");
const removePost = require("./removePost");
const removeCollection = require("./removeCollection");
const getAllSavedPostsByUserId = require("./getAllSavedPostsByUserId");

/**
 *
 * @return {object} neo4j driver object
 */
async function init() {
  return true;
}

/**
 * exports from the module
 */
module.exports = {
  init,
  getAllUsers,
  getUserByUsername,
  getAllCollectionsById,
  getCollectionDetails,
  createUser,
  createProfile,
  getProfileByUserId,
  createPostCollection,
  createPost,
  createSavePost,
  createPostComment,
  getPostsCommentsById,
  getAllPostCollection,
  getPostsByCollectionId,
  getAllPosts,
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
  getAllSavedPostsByUserId
};
