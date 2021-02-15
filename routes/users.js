const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

//Getting user model
const User = require("../Models/User");

//Getting validation function
const {
  userValidatorRegister,
  userValidatorLogin,
} = require("../validation/user");

// GET Requests

router.get("/", (req, res) => {
  res.send("Users");
});

router.get("/login", (req, res) => {
  res.send("Login");
});

router.get("/register", (req, res) => {
  res.send("Register");
});

//Register Handler

router.post("/register", (req, res) => {
  const response = userValidatorRegister(req.body);

  if (response.error) {
    const messages = response.error.details.map((detail) => detail.message);
    res.send(messages);
  } else {
    const { name, email, password } = req.body;

    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          res.send("Email is already registered");
        } else {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
              const newUser = new User({
                name,
                email,
                password: hash,
              });

              newUser
                .save()
                .then((user) => {
                  res.send(`User is sucessfully registered ${user}`);
                })
                .catch((err) => {
                  res.send(err);
                });
            });
          });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

//Login Handler

router.post("/login", (req, res) => {
  const response = userValidatorLogin(req.body);

  if (response.error) {
    const messages = response.error.details.map((detail) => detail.message);
    res.send(messages);
  } else {
    const { email, password } = req.body;

    User.findOne({ email: email })
      .then((user) => {
        if (!user) {
          res.send("Email is not registered please register yourself first");
        } else {
          bcrypt.compare(password, user.password, (err, response) => {
            if (response === true) {
              jwt.sign(
                { exp: Math.floor(Date.now() / 1000) + 60 * 60, _id: user._id },
                process.env.TOKEN_SECRET,
                (err, token) => {
                  res
                    .header("jwt_token", token)
                    .send(`Logged In ${user} and ${token}`);
                }
              );
            } else {
              res.send("Invalid Password");
            }
          });
        }
      })
      .catch((err) => {
        res.send(err);
      });
  }
});

module.exports = router;
