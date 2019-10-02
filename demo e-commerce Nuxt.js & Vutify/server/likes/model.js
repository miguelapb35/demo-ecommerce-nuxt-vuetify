const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  productId: { type: String, required: true },
  userId: { type: String, required: true },
  createdDate: { type: Date, default: new Date() }
});
const Like = mongoose.model("Like", LikeSchema);

module.exports = Like;
