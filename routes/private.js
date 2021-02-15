const router = require("express").Router();
const verifyToken = require("../verifytoken");

router.get("/", verifyToken, (req, res) => {
  res.send(`Private Route accessed with id ${req.user._id}`);
});

module.exports = router;
