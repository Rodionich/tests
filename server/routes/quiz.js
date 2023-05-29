const express = require("express");
const router = express.Router();

const {
  createQuiz,
  getQuiz,
  updateQuiz,
  getPersonalQuizes,
} = require("../controllers/quiz");

router.route("/").post(createQuiz).get(getPersonalQuizes);

router.route("/:id").get(getQuiz).patch(updateQuiz);

module.exports = router;
