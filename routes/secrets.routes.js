const router = require('express').Router();
const mongoose = require('mongoose');

const Secret = require('../models/Secret.model');

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

router.get("/secrets", isLoggedIn, (req, res) => {
    Secrets.find() // <-- all secrets shared from ur profile
    .populate("owner")
    .then(secrets => 
    res.render("secrets/secret-list", secrets)) // <-- .hbs page
    .catch(err => console.error(err))
});


router.get("/share", isLoggedIn, (req, res) => {
    res.render("secrets/share-secret"); // <-- .hbs page
});  

router.post("/share", isLoggedIn, (req, res) => {
    const secret = req.body;
    const { id } = req.session.currentUser
    console.log('userID', id)
    Secret.create({ secret })
    .then(newSecret =>  {
        console.log('secret', newSecret)
        res.redirect("/secrets/secret-list")})
});  

module.exports = router