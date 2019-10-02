require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userApi = require("./users/controllers");
const productApi = require("./products/controllers");
const likeApi = require("./likes/controllers");
const uploadApi = require("./uploads/upload");
const app = express();

//connect to MongoDB
mongoose
  .connect("YOUR_URI_HERE", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

//cause mongoose promises are deprecated
mongoose.Promise = global.Promise;

//replace body-parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Allows commucation with front-end
app.use(cors());

//initialize routes
app.use("/", userApi, productApi, likeApi, uploadApi);

//listen for requests
app.listen(process.env.PORT || 4000, function() {
  console.log("now listening for requests");
});
