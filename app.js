const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const PORT = 5000;

//Create express app
const app = express();
//Use modules
app.use(cookieParser());
app.use(express.json());
// app.use(session({ secret: "SomeGreatS3cre3tLIFTr" }));
app.use(passport.initialize());
app.use(passport.session());

const uri =
  "mongodb+srv://liftr:7NUrMWNaNSEdBwbe@tfg-cluster.igim9.azure.mongodb.net/login?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log("Connected to Mongo Atlas");
  },
  (err) => {
    /** handle initial connection error */
    console.log("error connecting to Mongo: ");
    console.log(err);
  }
);

const userRouter = require("./routes/User.js");
app.use("/user", userRouter);

const diaryRouter = require("./routes/Diary");
app.use(
  "/diary",
  passport.authenticate("jwt", { session: false }),
  diaryRouter
);

const workoutRouter = require("./routes/Workout");
app.use(
  "/workout",
  passport.authenticate("jwt", { session: false }),
  workoutRouter
);

app.listen(PORT, () => {
  console.log(`Express server started on ${PORT}`);
});
