const express = require("express");
const router = express.Router();

const { activateGame, addStudent } = require("../controllers/game");

router.route("/").post(activateGame);

router.route("/:questId/students").patch(addStudent);

module.exports = router;
