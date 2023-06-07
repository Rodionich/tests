const express = require("express");
const router = express.Router();

const {
  createQuest,
  getQuest,
  updateQuest,
  removeQuest,
  getPersonalQuests,
  searchQuests,
  likeQuest,
  commentQuest,
  getPublicQuests,
  getTasks,
  addTask,
  updateTask,
  removeTask,
} = require("../controllers/quest");

router.route("/").post(createQuest);

router.route("/teacher/:teacherId").get(getPersonalQuests);

router.route("/:id").get(getQuest).patch(updateQuest).delete(removeQuest);

router.post("/public", getPublicQuests);
router.get("/search/:search/:keywords", searchQuests);

router.patch("/:questId/likes/:userId", likeQuest);
router.post("/:questId/comment", commentQuest);

router.route("/:questId/tasks").post(addTask).get(getTasks);

router.route("/:questId/tasks/:taskId").patch(updateTask).delete(removeTask);

module.exports = router;
