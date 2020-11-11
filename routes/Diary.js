const express = require("express");
const Diary = require("../models/Diary");
const diaryRouter = express.Router();
const Food = require("../models/Food");
const User = require("../models/User");
const fetch = require("node-fetch");

diaryRouter.get("/today", (req, res) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  User.findById({ _id: req.user._id })
    .populate({
      path: "entries",
      match: { date: { $gte: start, $lt: end } },
      populate: {
        path: "item.ref",
        model: "Food",
      },
    })
    .exec((err, doc) => {
      if (err)
        res.status(500).json({
          msg: { msgBody: "error has occured", msgError: true },
          err: err,
        });
      else {
        console.log(doc);
        res.status(200).json({ entries: doc.entries, authenticated: true });
      }
    });
});

diaryRouter.post("/post", (req, res) => {
  const entry = new Diary(req.body);
  entry.save((err) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    else {
      req.user.entries.push(entry);
      req.user.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else
          res.status(200).json({
            message: {
              msgBody: "Successfully created entry",
              msgError: false,
            },
          });
      });
    }
  });
});

diaryRouter.post("/searchFood", (req, res) => {
  const { query, pageSize = 10 } = req.body;
  fetch(
    "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=h3h3hQgOLhYzTE7KfgUc2TlwLlNdEXiSDhNm3ODi&pageSize=" +
      pageSize.toString() +
      "&query=" +
      query,
    {
      headers: {
        Accept: "application/json",
      },
    }
  ).then((response) => {
    if (response.status === 200) {
      response.json().then((data) => {
        const foods = data.foods;
        res.send(foods);
      });
    }
  });
});
module.exports = diaryRouter;
