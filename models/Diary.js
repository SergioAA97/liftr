const mongoose = require("mongoose");

const DiarySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["breakfast", "lunch", "dinner", "snack"],
  },
  created: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  item: {
    ref: { type: mongoose.Schema.Types.ObjectId, ref: "Food" },
    quantity: {
      type: Number,
      required: true,
    }
  },
  lastModified: {
    type: Date,
    required: false,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Diary", DiarySchema);
