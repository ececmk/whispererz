const router = require('express').Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/User.model');
const Secret = require('../models/Secret.model');

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

const saltRounds = 10;


// SIGNUP


router.get("/signup", isLoggedOut, (req, res) => {
    res.render("auth/signup"); // <-- .hbs page
  });
  
  router.post("/signup", isLoggedOut, (req, res) => {
    const { username, password, secret } = req.body; // <-- from signup page, what was entered
  
    bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPW) => {
        console.log("Hashed password: ", hashedPW);
        return User.create({ username, password: hashedPW, secret }); // <-- from User.model
      })
      .then((newUser) => {
        console.log("new user", newUser)
        const { username } = newUser;
        Secret.create({secret, owner:newUser.id})
        console.log(`Welcome ${username}!`);
        res.redirect("/auth/login"); // <-- redirecting to the .hbs page
      })
      .catch((err) => console.log("No new user created.", err));
  });
  
 
  // LOG IN


  router.get("/login", isLoggedOut, (req, res) => res.render("auth/login"));  // <-- .hbs page
  
  router.post("/login", (req, res) => {
    const { username, password } = req.body; // <-- taking the username / password from the body of auth/login.hbs
  
    if (!username) {
      res.render("auth/login", { // <-- .hbs page
        usernameError: "No username provided",
      });
      return;
    }
  
    if (!password) {
      return res.render("auth/login", { // <-- .hbs page
        passwordError: "No password provided",
      });
    }
  
    User.findOne({ username })
      .then((possibleUser) => {
        if (!possibleUser) {
          return res.render("auth/login", { // <-- .hbs page
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
        req.session.userId =  possibleUser._id ; // <-- ._id from database
        console.log("Session info: ", req.session.userId);
        res.redirect("/auth/profile/"); // <-- rethinking how we reach the user's profile cuz only the current user is allowed to see the own profile, not the one from other people by just entering /user/random-name
      })
      .catch((err) => {
        console.log("Something went terribly wrong in the backend, thanks Christian", err);
        res.render("auth/login", { generalError: "Execute order 66" }); // <-- .hbs page
      });
  });
  
 
  // LOGOUT
  

  router.get("/logout", isLoggedIn, (req, res) => {
    req.session.destroy((err) => {
      res.clearCookie("No secrets with cookies saved"); // <-- not sure if true lol...
      if (err) {
        return res.redirect("/");
      }
      res.redirect("/");
    });
  });
  
  module.exports = router;

  /* will leave this here for now

  router.get("/", isLoggedIn, (req, res) => {
  res.render("user/welcome");
});

router.get("/:id", isLoggedIn, (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      const { username } = user;
      res.render("user/profile", { username });
    })
    .catch((err) => console.log("Error loading profile page", err));
});

*/ 
