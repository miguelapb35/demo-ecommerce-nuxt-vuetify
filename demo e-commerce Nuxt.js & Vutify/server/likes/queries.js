const Like = require("./model");

module.exports = {
  toggle,
  getByUserId
};

async function toggle(likeParam) {
  const like = await Like.findOne({
    productId: likeParam.productId,
    userId: likeParam.userId
  });
  if (like) {
    await Like.findByIdAndDelete({ _id: like.id });
  } else {
    const newLike = new Like(likeParam);
    return await newLike.save();
  }
}

async function getByUserId(id) {
  return await Like.find({ userId: id });
}
