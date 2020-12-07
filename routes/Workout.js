const express = require("express");
const workoutRouter = express.Router();
const Workout = require("../models/Workout");
const WorkoutSession = require("../models/WorkoutSession");
const Exercise = require("../models/Exercise");
const User = require("../models/User");

workoutRouter.get("/all", (req, res) => {
  User.findById({ _id: req.user._id })
    .populate([
      {
        path: "workouts",
        model: "Workout",
        populate: [
          {
            path: "exercises.ref",
            model: "Exercise",
          },
        ],
      },
      {
        path: "sessions",
        model: "WorkoutSession",
        populate: {
          path: "workout",
          model: "Workout",
        },
      },
    ])
    .exec((err, doc) => {
      if (err)
        res.status(500).json({
          msg: { msgBody: "error has occured", msgError: true },
          err: err,
        });
      else {
        console.log(doc);
        res.status(200).json({
          sessions: doc.sessions,
          workouts: doc.workouts,
          authenticated: true,
        });
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

workoutRouter.get("/delete", async (req, res) => {
  if (typeof req.query.id === "string") {
    if (req.query.id.length > 1) {
      try {
        const { id } = req.query;
        const entry = await Workout.deleteOne({ _id: id });
        const user = await User.findById(req.user._id);
        user.workouts.pull({_id: id})
        const sessions = await WorkoutSession.find({"_id": {"$in": user.sessions}});
        if(sessions){
          console.log(sessions);
        }
        for (let idx = 0; idx < sessions.length; idx++) {
          const e = sessions[idx];
          if(e.workout === id){
            await WorkoutSession.findByIdAndDelete(e);
          }
        }
        const result = await user.save();
        res
          .status(200)
          .json({ msg: "Workout deleted succesfully", authenticated: true });
      } catch (error) {
        console.log(error)
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
  try {
    const entry = new WorkoutSession({ timeStart, timeEnd, workout });
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      entry.items.push(element);
    }
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
});

workoutRouter.get("/getWorkout", async (req, res) => {
  const {id} = req.params;
  try {
    const doc = await Workout.find({_id: id});
    res.send(doc);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: {
        msgBody: "Error has ocurred getting workout",
        msgError: true,
      },
    });
  }
});

workoutRouter.post("/post/workout", async (req, res) => {
  const { _id, type, name, description, idMap, def } = req.body;
  if (_id) {
    try {
      let update = { name, description, idMap};
      let entry = await Workout.findById(_id);
      entry.name = name;
      entry.description = description;
      entry.idMap = idMap;
      let result = await entry.save();
      console.log("Doc found, editing...");
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
      const entry = new Workout({ name, description, def, type });
      idMap.forEach((e) => {
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
    const doc = await Exercise.find({});
    res.send(doc);
  } catch (error) {
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
