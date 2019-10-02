const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdDate: { type: Date, default: new Date() },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
