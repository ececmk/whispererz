const router = require('express').Router();

const User = require("../models/User.model");

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

/* router.get("/", isLoggedIn, (req, res) => {
  res.render("auth/profile");
}); */

router.get("/auth/profile", isLoggedIn, (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      const { username } = user;
      res.render("auth/profile", { username });
    })
    .catch((err) => console.log("Error loading profile page", err));
});

module.exports = router;