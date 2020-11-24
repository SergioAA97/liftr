const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  exerciseType: {
    type: String,
    required: true,
    enum: ["Aerobic", "Anaerobic", "Plyo"],
  },
  equipment: {
    type: String,
    required: true,
  },
  example: {
    type: String,
    required: false,
  },
  exercise: {
    type: String,
    required: true,
  },
  majorMuscle: {
    type: String,
    required: true,
  },
  minorMuscle: {
    type: String,
    required: false,
  },
  modifications: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Exercise", ExerciseSchema);
