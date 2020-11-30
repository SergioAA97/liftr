const mongoose = require("mongoose");

const WorkoutSessionSchema = new mongoose.Schema({
  timeStart: {
    type: Date,
    required: true,
  },
  timeEnd: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkoutEntry",
    },
  ],
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout",
  },
});

module.exports = mongoose.model("WorkoutSession", WorkoutSessionSchema);
