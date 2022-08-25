const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { userId: req.session.userId });
});

module.exports = router;