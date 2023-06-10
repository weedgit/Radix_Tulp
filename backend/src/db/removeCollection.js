/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {object} data
 * @return {object} REMOVE COLLECTION. VERY SENSITIVE QUERY.
 */
module.exports = async function (session, collectionId) {
  const deleteCollection = `
        MATCH(c:Collection{collectionId:$collectionId}) DETACH DELETE c
      `;
  //Delete all posts in the collection
  const deletePost = `
        MATCH(p:Post{collectionId:$collectionId}) DETACH DELETE p
      `;

  const queryInputDeleteCollection = {
    collectionId,
  };
  const removeCollection = await session.run(
    deleteCollection,
    queryInputDeleteCollection
  );
  const removePost = await session.run(deletePost, queryInputDeleteCollection);
  return true;
};
