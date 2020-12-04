const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
  },
  exercises: [
    {
      ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise",
      },
      values: {
        type: mongoose.Schema.Types.Array,
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
