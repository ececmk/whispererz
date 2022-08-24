//=======================================| require |=======================================//

const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/User.model');
const Secret = require('../models/Secret.model');

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

const saltRounds = 10;


//=======================================| Sign Up |=======================================//


router.get("/signup",  (req, res) => {
  res.render("auth/signup"); // <-- .hbs page
});

router.post("/signup",  (req, res) => {
  const { username, password, secret } = req.body; // <-- from signup page, what was entered

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPW) => {
      console.log("Hashed password: ", hashedPW);
      return User.create({ username, password: hashedPW, secret }); // <-- User.model
    })
    .then((newUser) => {
      console.log("new user", newUser)
      const { username } = newUser;
      return Secret.create({ secret, owner: newUser.id })
    })
    .then(() => {
      console.log(`Welcome ${username}!`);
      res.redirect("/auth/login"); // <-- redirecting to the .hbs page
    })
    .catch((err) => console.log("No new user created.", err));
});


//=======================================| Log In |=======================================//


router.get("/login", (req, res) => res.render("auth/login"));   // <-- .hbs page

router.post("/login", (req, res) => {
  const { username, password } = req.body;  // <-- taking the username / password from the body of auth/login.hbs

  if (!username) {                          // <-- no username
    res.render("auth/login", {              // <-- .hbs page
      usernameError: "No username provided",
    });
    return;
  }

  if (!password) {                          // <-- no password
    return res.render("auth/login", {       // <-- .hbs page
      passwordError: "No password provided",
    });
  }

  User.findOne({ username })
    .then((possibleUser) => {
      if (!possibleUser) {
        return res.render("auth/login", {   // <-- .hbs page
          generalError: "Wrong user",
        });
      }

      // user is found
      const isSamePassword = bcrypt.compareSync(
        password,
        possibleUser.password
      );

      if (!isSamePassword) {
        return res.render("auth/login", { // <-- .hbs page
          generalError: "Wrong password",
        });
      }

      // user is found, the password is correct
      req.session.currentUser = possibleUser._id; // <-- ._id from database
      res.redirect('profile');
    });
})


//=======================================| Log Out |=======================================//


  router.get("/logout", (req, res) => {
    req.session = null                                                                              
    req.session.currentUser = null
    req.session.destroy((err) => {
      res.redirect('/')
    })
  });
  
  module.exports = router;
