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
      match: { created: { $gte: start, $lt: end } },
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
        res.status(200).json({ entries: doc.entries, authenticated: true });
      }
    });
});

diaryRouter.get("/entry", (req, res) => {
  if (typeof req.query.id === "string") {
    if (req.query.id.length > 1) {
      User.findById({ _id: req.user._id })
        .populate({
          path: "entries",
          match: { _id: req.query.id },
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
            res.status(200).json({ entry: doc.entries, authenticated: true });
          }
        });
    } else {
      res.status(404).json({
        msg: { msgBody: "not found", msgError: true },
      });
    }
  }
});

diaryRouter.get("/delete", async (req, res) => {
  if (typeof req.query.id === "string") {
    if (req.query.id.length > 1) {
      try {
        const { id } = req.query;
        const entry = await Diary.deleteOne({ _id: id });
        res
          .status(200)
          .json({ msg: "Entry deleted succesfully", authenticated: true });
      } catch (error) {
        res.status(500).json({
          msg: { msgBody: "error has occured", msgError: true },
          err: error,
        });
      }
    } else {
      res.status(404).json({
        msg: { msgBody: "not found", msgError: true },
      });
    }
  }
});

diaryRouter.post("/post", async (req, res) => {
  const { item, _id, quantity } = req.body;
  if (_id) {
    try {
      let entry = await Diary.findById(_id);
      console.log("Doc found, editing...");
      console.log(entry);
      entry.item.quantity = item.quantity;
      console.log(entry);
      await entry.save();
      res.status(200).json({
        message: {
          msgBody: "Successfully edited entry",
          msgError: false,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    }
  } else {
    try {
      const entry = new Diary(req.body);
      const ret = await entry.save();
      req.user.entries.push(entry);
      const save = await req.user.save();
      res.status(200).json({
        message: {
          msgBody: "Successfully created entry",
          msgError: false,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: { msgBody: "Error has occured", msgError: true },
      });
    }
  }
});

diaryRouter.post("/searchFood", (req, res) => {
  const { query, pageSize = 10 } = req.body;
  const food = Food.aggregate(
    [
      {
        $match: {
          description: { $regex: query, $options: "gi" },
        },
      },
      {
        $addFields: {
          index: {
            $indexOfCP: [
              {
                $toLower: "$description",
              },
              query,
            ],
          },
        },
      },
      {
        $sort: {
          index: 1,
        },
      },
      { $limit: pageSize },
    ],
    (err, doc) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: {
            msgBody: "Error has ocurred finding food",
            msgError: true,
          },
        });
      } else {
        res.send(doc);
      }
    }
  );
});

diaryRouter.get("/getUserSettings", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (user.biometrics) {
      res.status(200).json({ data: user.biometrics });
    } else {
      res.status(404).json({
        msg: { msgBody: "not found", msgError: true },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: { msgBody: "error has occured", msgError: true },
      err: err,
    });
  }
});

diaryRouter.post("/updateUserSettings", async (req, res) => {
  try {
    const { gender, weight, height, age } = req.body;
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { biometrics: { gender, weight, height, age } }
    );
    res.status(200).json({ authenticated: true });
  } catch (err) {
    res.status(500).json({
      msg: { msgBody: "error has occured", msgError: true },
      err: err,
    });
  }
});

module.exports = diaryRouter;
