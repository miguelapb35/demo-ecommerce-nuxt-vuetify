const express = require("express");
const router = express.Router();
const queries = require("./queries");

//AUTH
const jwt = require("jsonwebtoken");
const verifyToken = require("../auth/verify");
const { ACCESS_TOKEN_SECRET } = require("../auth/ENV");
//AWS
const aws = require("aws-sdk");
const { ACCESS_KEY_ID } = require("../auth/ENV");
const { AWS_SECRET_ACCESS_KEY } = require("../auth/ENV");
const { AWS_BUCKET_NAME } = require("../auth/ENV");
//PROFILE IMAGE STORING STARTS
const s3 = new aws.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  Bucket: AWS_BUCKET_NAME
});


// routes
router.post("/product", verifyToken, create);
router.put("/product/:id", verifyToken, update);
router.get("/product/:id", getById);
router.get("/userProducts/:seller", getBySeller);
router.get("/products/:gender", getByGender);
router.delete("/product/:id", verifyToken, deleteProd);

module.exports = router;

function create(req, res, next) {
  jwt.verify(req.token, ACCESS_TOKEN_SECRET, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      queries
        .create(req.body)
        .then(prod => res.json(prod))
        .catch(err => next(err));
    }
  });
}
function update(req, res, next) {
  jwt.verify(req.token, ACCESS_TOKEN_SECRET, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      queries
        .update(req.params.id, req.body)
        .then(prod => res.json(prod))
        .catch(err => next(err));
    }
  });
}
function getById(req, res, next) {
  queries
    .getById(req.params.id)
    .then(prod => (prod ? res.json(prod) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getBySeller(req, res, next) {
  queries
    .getBySeller(req.params.seller)
    .then(prod => (prod ? res.json(prod) : res.sendStatus(404)))
    .catch(err => next(err));
}

function getByGender(req, res, next) {
  queries
    .getByGender(req.params.gender)
    .then(prod => (prod ? res.json(prod) : res.sendStatus(404)))
    .catch(err => next(err));
}

function deleteProd(req, res, next) {
  jwt.verify(req.token, ACCESS_TOKEN_SECRET, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      queries
        .deleteProd(req.params.id)
        .then(product => {
          let key = product.url.substring(51);
          s3.deleteObject(
            {
              Bucket: AWS_BUCKET_NAME,
              Key: key
            },
            function(err, data) {
              if (err) console.log(err, err.stack);
              // an error occurred
              else console.log(data); // successful response
            }
          );
          res.json(product);
        })
        .catch(err => next(err));
    }
  });
}
