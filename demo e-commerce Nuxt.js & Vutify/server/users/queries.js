const User = require("./model");
//AUTH
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ACCESS_TOKEN_SECRET } = require("../auth/ENV");

module.exports = {
  register,
  login,
  getAll,
  getById
};

async function register(userParam) {
  if (
    await User.findOne({
      email: userParam.email
    })
  ) {
    throw 'Email "' + userParam.email + '" is already taken';
  } else {
    const newUser = new User(userParam);
    await bcrypt.hash(userParam.password, 10, (err, hash) => {
      newUser.password = hash;
      newUser.save();
    });
  }
}

async function login(userParam) {
  const user = await User.findOne({
    email: userParam.email
  });
  if (user && bcrypt.compareSync(userParam.password, user.password)) {
    const payload = {
      _id: user._id,
      userName: user.userName
    };
    const token = jwt.sign({ payload }, ACCESS_TOKEN_SECRET, {
      expiresIn: "24h"
    });
    return {payload,token}
  } else {
    return {};
  }
}

async function getAll() {
  return await User.find();
}

async function getById(id) {
  return await User.findById({ _id: id });
}
