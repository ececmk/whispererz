//=======================================| require |=======================================//

const router = require('express').Router();
const mongoose = require('mongoose');

const Secret = require('../models/Secret.model');

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

//=======================================| share a secret |=======================================//

router.get("/share-secret", (req, res) => {
    res.render("secrets/share-secret")
});

router.post("/share-secret", (req, res) => {
    const { secret } = req.body; // <-- taking secret from the body
    Secret.create({ secret })
    .then(newSecret =>  {
        console.log('secret', newSecret)
        res.redirect("/secrets/read-secret") 
    })
    .catch(err => console.error(err))
});  

//=======================================| read a secret |=======================================//

router.get("/read-secret", (req, res) => {
    Secret.find()
    .then(secret => {
    // console.log("Secret-Log 1: ", { Secret })
    // console.log("Secret-Log 2: ", Secret ) 
        console.log("Secret-Log 3: ", Secret,secret )
    // console.log("Secret-Log 4: ", { Secret,secret } ) 
        res.render("secrets/read-secret"),  { Secret,secret }  })
    .catch(err => console.error(err))
  
});
//=======================================| edit a secret |=======================================//

 router.get("/edit/:secretId", isLoggedIn, (req, res) => { // <-- secretId, where to get that from?
    res.render("secrets/edit-secret"); // <-- .hbs page
});  

/* 
 router.post("/edit/:secretId", isLoggedIn, (req, res) => { // <-- secretId, where to get that from?
    res.render("secrets/edit-secret"); // <-- .hbs page

//=======================================| delete a secret |=======================================//

router.post("/delete/:secretId", isLoggedIn (req, res)) */

module.exports = router