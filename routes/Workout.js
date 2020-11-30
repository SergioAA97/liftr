const express = require("express");
const Workout = require("../models/Workout");
const WorkoutSession = require("../models/WorkoutSession");
const WorkoutEntry = require("../models/WorkoutEntry");
const workoutRouter = express.Router();
const Exercise = require("../models/Exercise");
const User = require("../models/User");

workoutRouter.get("/all", (req, res) => {
  User.findById({ _id: req.user._id })
    .populate({
      path: "workouts",
      model: "Workout",
      populate: [
        {
          path: "exercises",
          model: "Exercise",
        }
      ],
    })
    .exec((err, doc) => {
      if (err)
        res.status(500).json({
          msg: { msgBody: "error has occured", msgError: true },
          err: err,
        });
      else {
        console.log(doc);
        res.status(200).json({ workouts: doc.workouts, authenticated: true });
      }
    });
});

workoutRouter.get("/previous", (req, res) => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  User.findById({ _id: req.user._id })
    .populate({
      path: "sessions",
      match: { timeStart: { $lt: end } },
      mode: "WorkoutSession",
      populate: [
        {
          path: "items",
          model: "WorkoutEntry",
        },
        {
          path: "workout",
          model: "Workout",
        },
      ],
    })
    .exec((err, doc) => {
      if (err)
        res.status(500).json({
          msg: { msgBody: "error has occured", msgError: true },
          err: err,
        });
      else {
        console.log(doc);
        res.status(200).json({ sessions: doc.sessions, authenticated: true });
      }
    });
});

workoutRouter.get("/entry", (req, res) => {
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

workoutRouter.get("/delete", async (req, res) => {
  if (typeof req.query.id === "string") {
    if (req.query.id.length > 1) {
      try {
        const { id } = req.query;
        const entry = await Workout.deleteOne({ _id: id });
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

workoutRouter.post("/post/session", async (req, res) => {
  const { _id, timeStart, timeEnd, items, workout } = req.body;
  if (_id) {
    try {
      let entry = await WorkoutSession.findById(_id);
      console.log("Doc found, editing...");
      console.log(entry);
      entry = { ...req.body };
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
      const entry = new WorkoutSession({ timeStart, timeEnd, items, workout });
      const ret = await entry.save();
      req.user.sessions.push(entry);
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

workoutRouter.post("/post/workout", async (req, res) => {
  const { _id, type, name, description, idMap, def } = req.body;
  if (_id) {
    try {
      let entry = await Workout.findById(_id);
      console.log("Doc found, editing...");
      console.log(entry);
      entry = { ...req.body };
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
      const entry = new Workout({name, description, def, type});
      idMap.forEach(e => {
        entry.exercises.push(e);
      });
      const ret = await entry.save();
      req.user.workouts.push(entry);
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

workoutRouter.post("/searchExercise", (req, res) => {
  const { query, pageSize = 10 } = req.body;
  const exercise = Exercise.aggregate(
    [
      {
        $match: {
          exercise: { $regex: query, $options: "gi" },
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
            msgBody: "Error has ocurred finding exercise",
            msgError: true,
          },
        });
      } else {
        res.send(doc);
      }
    }
  );
});

workoutRouter.get("/exercises", async (req, res) => {
  try {
    const doc = await Exercise.find({})
    res.send(doc)
  } catch(error){
    console.log(error);
    res.status(500).json({
      message: {
        msgBody: "Error has ocurred getting exercises",
        msgError: true,
      },
    });
  }   
});

module.exports = workoutRouter;
