const router = require('express').Router();

const User = require("../models/User.model");

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');
const Secret = require('../models/Secret.model');

router.get("/", isLoggedIn, (req, res) => {
  res.render("auth/profile");
});

router.get("/profile", isLoggedIn, (req, res) => {
  User.findById(req.session.userId)
    .then((user) => {
      console.log(user);
      const { username, credit } = user;

      return Secret.find({ owner: req.session.userId }).then((secrets) => {
        return {
          secrets,
          username,
          credit
        }
      });
    })
    .then(({ username, secrets,credit }) => {
      res.render("./auth/profile", {
        username,
        secrets,
        credit
      });
    })
    .catch((err) => console.log("Error loading profile page", err));
});

module.exports = router;