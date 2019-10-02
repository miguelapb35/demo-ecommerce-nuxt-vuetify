const express = require("express");
const router = express.Router();
const queries = require("./queries");

//AUTH
const jwt = require("jsonwebtoken");
const verifyToken = require("../auth/verify");
const { ACCESS_TOKEN_SECRET } = require("../auth/ENV");

// routes
router.post("/register", register);
router.post("/login", login);
router.get("/users", verifyToken, getAll);
router.get("/user/:id", verifyToken, getById);

module.exports = router;

function register(req, res, next) {
  queries
    .register(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

function login(req, res, next) {
  queries
    .login(req.body)
    .then(user => res.json(user))
    .catch(err => next(err));
}

function getAll(req, res, next) {
  jwt.verify(req.token, ACCESS_TOKEN_SECRET, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      queries
        .getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
    }
  });
}
function getById(req, res, next) {
  jwt.verify(req.token, ACCESS_TOKEN_SECRET, err => {
    if (err) {
      res.sendStatus(403);
    } else {
      queries
        .getById(req.params.id)
        .then(user => (user ? res.json(user) : res.sendStatus(404)))
        .catch(err => next(err));
    }
  });
}
