const router = require('express').Router();
const mongoose = require('mongoose');

const Secret = require('../models/Secret.model');

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

/* router.get("/secrets", isLoggedIn, (req, res) => {
    Secrets.find() // <-- all secrets shared from ur profile
    .populate("owner")
    .then(secrets => 
    res.render("auth", { secrets })) // <-- .hbs page
    .catch(err => console.error(err))
}); */


router.get("/share", isLoggedIn, (req, res) => {
    res.render("secrets/share-secret")
});

router.post("/share", isLoggedIn, (req, res) => {
    const secret = req.body; // <-- taking secret from the body
    const { _id } = req.session.currentUser // <-- rethinking if it makes sense to be here
    console.log('userID', _id)
    Secret.create({ secret })
    .then(newSecret =>  {
        console.log('secret', newSecret)
        res.redirect("/secrets/read-secret")
    })
    .catch(err => console.error(err))
});  

router.get("/secrets/read-secret", isLoggedIn, (req, res) => {
    res.render("secrets/read-secret");
})

 router.get("/edit/:secretId", isLoggedIn, (req, res) => { // <-- secretId, where to get that from?
    res.render("secrets/edit-secret"); // <-- .hbs page
});  
/* 
router.post("/edit", isLoggedIn, (req, res))

router.post("/delete/:secretId", isLoggedIn (req, res)) */

module.exports = router