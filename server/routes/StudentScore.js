const express = require("express");
const router = express.Router();
const { saveStudentScore } = require("../controllers/studentScore");

router.route("/").post(saveStudentScore);

module.exports = router;
