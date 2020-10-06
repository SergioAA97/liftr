const express = require("express");
const diaryRouter = express.Router();

diaryRouter.get("/", function (req, res, next) {
  res.send("Resource");
});

module.exports = diaryRouter;
