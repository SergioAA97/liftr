const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 6,
    maxlength: 18,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
  entries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Diary" }],
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "WorkoutSession" }],
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
  goals: [
    {
      calories: mongoose.Schema.Types.Number,
      protein: mongoose.Schema.Types.Number,
      carbohydrates: mongoose.Schema.Types.Number,
      fat: mongoose.Schema.Types.Number,
    },
  ],
  customGoals: [
    {
      name: {
        type: mongoose.Schema.Types.Number,
        required: true,
      },
      property: {
        type: mongoose.Schema.Types.String,
        enum: ["dailyExercise", "sodiumIntake"],
        required: true,
      },
      goalValue: {
        type: mongoose.Schema.Types.Number,
        required: true,
      },
      active: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
      },
    },
  ],
});

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    else if (!isMatch) return callback(null, isMatch);
    else return callback(null, this);
  });
};

module.exports = mongoose.model("User", UserSchema);
