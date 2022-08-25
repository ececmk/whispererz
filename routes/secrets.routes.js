const router = require('express').Router();
const mongoose = require('mongoose');

const Secret = require('../models/Secret.model');
const User = require('../models/User.model');

const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

/* router.get("/secrets", isLoggedIn, (req, res) => {
    Secret.find() // <-- all secrets shared from ur profile
    .populate("owner")
    .then(secrets => 
    res.render("/auth/profile", { secrets })) // <-- .hbs page
    .catch(err => console.error(err))
});  */


router.get("/share-secret", (req, res) => {
    res.render("secrets/share-secret")
});

router.post("/share-secret", isLoggedIn, (req, res) => {
    const { secret } = req.body; // <-- taking secret from the body
    const { _id } = req.session.currentUser // <-- rethinking if it makes sense to be here
    console.log('userID', _id)
    Secret.create({ secret, owner: _id })
        .then(newSecret => {
            console.log('secret', newSecret)
            User.findById(req.session.userId).then(user => {
                return user.updateOne({ credit: user.credit + 5 })
            }).then(() => {
                res.redirect("/auth/profile")
            })
        })
        .catch(err => console.error(err))
});

router.get("/read-secret", isLoggedIn, (req, res) => {

    User.findById(req.session.userId).then((user) => {
        console.log(user);
        const { credit } = user;

        if (credit !== 0) {
            Secret.find()
                .then(secrets => {
                    const randomSecret = secrets[Math.floor(Math.random() * (secrets.length - 1) + 1)]

                    user.updateOne({ credit: Math.abs(credit - 1) }).then(() => {
                        res.render("secrets/read-secret", { secret: randomSecret, credit: user.credit - 1 });
                    })
                })
        } else {
            res.render("secrets/read-secret", { creditError: 'You have no creadit to read a secret. You need to share a secret' });
        }

    })

})

router.get("/edit/:secretId", isLoggedIn, (req, res) => { // <-- secretId, where to get that from?
    Secret.findById(req.params.secretId).then(secret => {
        res.render("secrets/edit-secret", { secret }); // <-- .hbs page

    })
});

router.post("/edit/:secretId", isLoggedIn, (req, res) => { // <-- secretId, where to get that from?
    // console.log(req.params.secretId, 123);
    // console.log(req.body, 123);
    Secret.findById(req.params.secretId)
        .update({
            secret: req.body.secret
        })
        .then(secret => {
            res.redirect("/auth/profile")
        })
});
/* 
 router.post("/edit/:secretId", isLoggedIn, (req, res) => { // <-- secretId, where to get that from?
    res.render("secrets/edit-secret"); // <-- .hbs page

    */
router.get("/delete/:secretId", isLoggedIn, (req, res) => {
    Secret.findByIdAndRemove(req.params.secretId).then(() => {
        res.redirect("/auth/profile")
    })
})

module.exports = router