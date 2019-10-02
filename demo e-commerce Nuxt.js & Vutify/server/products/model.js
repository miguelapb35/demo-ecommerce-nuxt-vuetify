const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: String,
  description: String,
  condition: String,
  url: String,
  brand: String,
  size: String,
  price: String,
  category: String,
  gender: String,
  createdDate: { type: Date, default: new Date() },
  seller: {
    _id: String,
    userName: String
  }
});
const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
