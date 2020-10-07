const mongoose = require("mongoose");

const DiarySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  entries: [DiaryEntrySchema],
});

const DiaryEntrySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "dinner", "snack"],
  },
  item: {
    ref: { type: String },
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
