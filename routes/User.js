const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConifg = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "LIFTr",
      sub: userID,
    },
    "SomeGreatS3cre3tLIFTr",
    {
      expiresIn: "2h",
    }
  );
};

userRouter.post("/signup", (req, res) => {
  const { username, password, role } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ msg: { body: "An error has occured", msgError: true } });
    else {
      if (user)
        res
          .status(400)
          .json({ msg: { body: "Username already exists", msgError: true } });
      else {
        //No error, create user
        let newUser = new User({ username, password, role });
        newUser.save((error) => {
          if (error)
            res.status(500).json({
              msg: {
                body: "An error has occured",
                msgError: true,
                err: error,
              },
            });
          else {
            res.status(201).json({
              msg: {
                body: "User has been created",
                msgError: false,
              },
            });
            console.log(`User ${username} has signed up!`);
          }
        });
      }
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      console.log(`User ${username} has logged in`);
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { username } = req.user;
    res.clearCookie("access_token");
    console.log(`User ${username} has logged out`);
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username, role } = req.user;

    res.status(200).json({
      isAuthenticated: true,
      user: {
        username,
        role,
      },
    });
  }
);

userRouter.post(
  "/workoutPreferences",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username, role } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      console.log(`User ${username} has logged in`);
      res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
  }
);

module.exports = userRouter;
