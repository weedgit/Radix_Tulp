/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {object} data
 * @return {object} REMOVE POST. VERY SENSITIVE QUERY.
 */
module.exports = async function (session, userId, comment_on_post_id) {
  const deletePost = `
      MATCH(p:Post{userId:$userId}) DETACH DELETE p
    `;

  //Delete all post comments too
  const deletePostComments = `
      MATCH(p:Post{comment_on_post_id:$comment_on_post_id}) DETACH DELETE p
    `;
  const queryInputDeletePost = {
    userId,
  };
  const queryInputDeleteComment = {
    comment_on_post_id,
  };
  const removePost = await session.run(deletePost, queryInputDeletePost);
  const removePostComments = await session.run(
    deletePostComments,
    queryInputDeleteComment
  );
  return true;
};
