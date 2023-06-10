/**
 * Module dependencies.
 */

/**
 *
 * @param {object} session
 * @param {string} id
 * @return {object} Likes
 */

module.exports = async function (session, post_id) {
  const cypherLikeQuery = `
    MATCH (l:Like{post_id:$post_id})
    RETURN l
    `;
  const cypherDislikeQuery = `
    MATCH (d:Dislike{post_id:$post_id})
    RETURN d
    `;
  const queryInput = { post_id };
  const resultLike = await session.run(cypherLikeQuery, queryInput);
  const resultDislike = await session.run(cypherDislikeQuery, queryInput);

  let likes;
  let disLikes;
  if (!resultLike.records || !resultLike.records[0]) {
    // likes.push(false);
  }else{
    const PostLikes = [];
    for (const record of resultLike.records) {
      const node = record.get(0);
      PostLikes.push(node.properties);
    }
    likes = PostLikes;
  }

  if (!resultDislike.records || !resultDislike.records[0]) {
    // throw new Error("No user likes");
    // disLikes.push(false);
  }else{

    const PostDisLikes = [];
    for (const record of resultDislike.records) {
      const node = record.get(0);
      PostDisLikes.push(node.properties);
    }
    disLikes = PostDisLikes;
  }

  let arr;
  if(likes?.length > 0 && disLikes?.length > 0){
    arr = {likes:likes, disLikes: disLikes};
  }else if(likes?.length > 0 && !disLikes?.length > 0){
    arr = {likes:likes};
  }else if(!likes?.length > 0 && disLikes?.length > 0){
    arr = {disLikes: disLikes};
  }
  
  return arr;
};
