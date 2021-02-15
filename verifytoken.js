const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("jwt_token");

  if (!token) {
    res.send("You are not logged in please login first");
  } else {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.send("Token not verified");
    }
  }
};
