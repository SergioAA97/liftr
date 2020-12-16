const express = require("express");
const Diary = require("../models/Diary");
const goalRouter = express.Router();
const User = require("../models/User");

goalRouter.post("/saveCore", async (req, res) => {
  try {
    const { calories, protein, fat, carbohydrates } = req.body;
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        goals: {
          carbohydrates,
          fat,
          protein,
          calories,
        },
      }
    );
    res.status(200).json({
      customGoals: user.customGoals.filter((x) => x.active),
      goals: user.goals,
      authenticated: true,
    });
  } catch (err) {
    res.status(500).json({
      msg: { msgBody: "error has occured", msgError: true },
      err: err,
    });
  }
});

goalRouter.post("/saveCustom", async (req, res) => {
  try {
    const { goalValue, name, endDate, startDate } = req.body;

    const user = await User.findById({ _id: req.user._id });
    user.customGoals.push({ goalValue, name, endDate, startDate });
    await user.save();
    res.status(200).json({
      customGoals: user.customGoals.filter(
        (x) => x.endDate >= new Date(Date.now())
      ),
      authenticated: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: { msgBody: "error has occured", msgError: true },
      err: err,
    });
  }
});

goalRouter.get("/today", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    res.status(200).json({
      customGoals: user.customGoals.filter((x) => x.active),
      goals: user.goals,
      authenticated: true,
    });
  } catch (err) {
    res.status(500).json({
      msg: { msgBody: "error has occured", msgError: true },
      err: err,
    });
  }
});

goalRouter.get("/getAll", async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    res.status(200).json({
      customGoals: user.customGoals,
      goals: user.goals,
      authenticated: true,
    });
  } catch (err) {
    res.status(500).json({
      msg: { msgBody: "error has occured", msgError: true },
      err: err,
    });
  }
});

goalRouter.get("/entry", (req, res) => {
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

goalRouter.get("/delete", async (req, res) => {
  if (typeof req.query.name === "string") {
    if (req.query.name.length > 1) {
      try {
        const { name } = req.query;
        const result = await User.updateOne(
          { _id: req.user.id },
          { $pull: { customGoals: { name: name } } }
        );
        res
          .status(200)
          .json({ msg: "Entry deleted succesfully", authenticated: true });
      } catch (error) {
        console.log(error);
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

goalRouter.post("/post", async (req, res) => {
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

module.exports = goalRouter;
