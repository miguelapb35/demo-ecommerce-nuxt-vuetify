const express = require("express");
const router = express.Router();
const queries = require("./queries");

//AUTH
const jwt = require("jsonwebtoken");
const verifyToken = require("../auth/verify");
const { ACCESS_TOKEN_SECRET } = require("../auth/ENV");

//ROUTES
router.post("/like",verifyToken, toggle);
router.get("/likes/:userId",verifyToken, getByUserId);

module.exports = router;

function toggle(req, res, next) {
  jwt.verify(req.token, ACCESS_TOKEN_SECRET, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      queries
        .toggle(req.body)
        .then(like => res.json(like))
        .catch(err => next(err));
    }
  });
}

function getByUserId(req, res, next) {
  jwt.verify(req.token, ACCESS_TOKEN_SECRET, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      queries
        .getByUserId(req.params.userId)
        .then(likes => (likes ? res.json(likes) : res.sendStatus(404)))
        .catch(err => next(err));
    }
  });
}
