const mongoose = require("mongoose");

const DiarySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "dinner", "snack"],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  item: {
    ref: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Diary", DiarySchema);
