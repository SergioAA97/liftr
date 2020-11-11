const mongoose = require("mongoose");

const Food = new mongoose.Schema({
  name: String,
  label: {
    servingSize: Number,
    kcal: Number,
    kj: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number,
    transFat: Number,
    saturatedFat: Number,
    sodium: Number,
    sugar: Number,
    fiber: Number,
    calcium: Number,
    iron: Number,
    potassium: Number,
  },
  category: String,
  fdcId: Number,
});

module.exports = mongoose.model("Food", Food);
