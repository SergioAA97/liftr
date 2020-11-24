const mongoose = require("mongoose");

const WorkoutEntrySchema = new mongoose.Schema({
  notes: {
    type: String,
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  repetitions: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  lastModified: {
    type: Date,
    required: true,
    defualt: Date.now(),
  },
});

module.exports = mongoose.model("WorkoutEntry", WorkoutEntrySchema);
