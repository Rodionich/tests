const StudentScore = require("../models/StudentScore");

const saveStudentScore = async (req, res) => {
  const { studentId, questId, points, answers } = req.body;
  const studentScore = new StudentScore({
    studentId,
    questId,
    points,
    answers,
  });

  try {
    const newStudentScore = await studentScore.save();
    res.status(201).json(newStudentScore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  saveStudentScore,
};
