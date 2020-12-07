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
  items: [{
      duration: Number,
      repetitions: Number,
      weight: Number,
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
        required: true,
      },
  }],
  workout: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workout",
  },
});

module.exports = mongoose.model("WorkoutSession", WorkoutSessionSchema);
