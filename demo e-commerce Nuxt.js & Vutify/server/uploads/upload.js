const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const verifyToken = require("../auth/verify");
const { ACCESS_TOKEN_SECRET } = require("../auth/ENV");
const aws = require("aws-sdk");
const multer = require("multer");
var multerS3 = require("multer-s3");
const path = require("path");
const { ACCESS_KEY_ID } = require("../auth/ENV");
const { AWS_SECRET_ACCESS_KEY } = require("../auth/ENV");
const { AWS_BUCKET_NAME } = require("../auth/ENV");

//PROFILE IMAGE STORING STARTS
const s3 = new aws.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  Bucket: AWS_BUCKET_NAME
});

//Single Upload
const imgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    acl: "public-read",
    key: function(req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
      );
    }
  }),
  limits: { fileSize: 2000000 }, // In Mbytes: 2 MB
  fileFilter: function(req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  }
}).single("file");

//Check File Type
router.post("/upload", verifyToken, (req, res, next) => {
  jwt.verify(req.token, ACCESS_TOKEN_SECRET, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      imgUpload(req, res, error => {
        console.log("requestOkokok", req.file);
        if (error) {
          console.log("errors", error);
          res.json({ error: error });
        } else {
          // If File not found
          if (req.file === undefined) {
            console.log("Error: No File Selected!");
            res.json("Error: No File Selected");
          } else {
            // If Success
            const url = req.file.location;
            res.json(url);
          }
        }
      });
    }
  });
});
// End of single profile upload

module.exports = router;
