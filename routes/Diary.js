const express = require("express");
const diaryRouter = express.Router();
const Diary = require("../models/Diary");
const User = require("../models/User");

diaryRouter.get("/today", (req, res) => {
  User.findById({ _id: req.user._id })
    .populate("diary")
    .exec((err, doc) => {
      if (err)
        res
          .status(500)
          .json({ msg: { msgBody: "error has occured", msgError: true } });
      else res.status(200).json({ diary: doc.diary, authenticated: true });
    });
});
module.exports = diaryRouter;
