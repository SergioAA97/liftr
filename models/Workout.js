const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    default: ""
  },
  exercises: [
    {
      ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
      sets: {
        type: mongoose.Schema.Types.Number,
        require: true,
      },
    },
  ],
  def: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model("Workout", WorkoutSchema);
