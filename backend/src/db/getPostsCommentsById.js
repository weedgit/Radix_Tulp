/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} Post Comments by post ID
 */

module.exports = async function (session, id) {
  const cypherQuery = `
    MATCH (p:Post {comment_on_post_parent_id: $id})
    RETURN p
    `;
  const queryInput = { id };
  const result = await session.run(cypherQuery, queryInput);
  if (!result.records || !result.records[0]) {
    throw new Error("No post comments");
  }

  const comments = [];
  for (const record of result.records) {
    const node = record.get(0);
    comments.push(node.properties);
  }
  return comments;
};
