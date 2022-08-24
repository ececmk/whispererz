//=======================================| require |=======================================//

const router = require('express').Router();

const User = require("../models/User.model");
const Secret = require('../models/Secret.model');

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

//=======================================| Profile I |=======================================//

 router.get("/profile", (req, res) => {
  const userId = req.session.currentUser
  console.log("userId",userId)
  if(!userId){
    res.redirect("login")
  }
  User.findOne({userId})
    .then((user) => {
      const { username } = user;
      Secret.find({ owner: userId }).then(secrets => {
        res.render("auth/profile", { data: { user: username, secretList: secrets } });
      })
    })
    .catch((err) => console.log("Error loading profile page", err));
}); 

module.exports = router;