const Product = require("./model");


module.exports = {
  create,
  update,
  getById,
  getByGender,
  getBySeller,
  deleteProd
};

async function create(productParam) {
  const product = new Product(productParam);
  return await product.save();
}

async function update(id, productParam) {
  const product = await Product.findById(id);
  if (!product) throw "Product not found";
  Object.assign(product, productParam);
  return await product.save();
}

async function getById(id) {
  return await Product.findById({ _id: id });
}

async function getByGender(gender) {
  return gender === "all"
    ? await Product.find()
    : await Product.find({ gender: gender });
}

async function getBySeller(seller) {
  return await Product.find({ "seller._id": seller });
}

async function deleteProd(id) {
  return await Product.findByIdAndDelete({ _id: id });
 
}
