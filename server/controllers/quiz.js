const mongoose = require("mongoose");
const Quiz = require("../models/Quiz");

const createQuiz = async (req, res) => {
  const {
    title,
    backgroundImage,
    description,
    creatorName,
    pointsPerQuestion,
    isPublic,
    questionList,
    creatorId,
  } = req.body;
  const quiz = new Quiz({
    title,
    backgroundImage,
    description,
    creatorId,
    creatorName,
    pointsPerQuestion,
    numberOfQuestions: questionList.length,
    isPublic,
    questionList,
    dateCreated: new Date().toISOString(),
  });

  try {
    const newQuiz = await quiz.save();
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getQuiz = async (req, res) => {
  let quiz;
  try {
    quiz = await Quiz.findById(req.params.id);
    if (quiz == null) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuiz = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No quiz with id: ${id}`);
  }

  const {
    name,
    backgroundImage,
    description,
    pointsPerQuestion,
    isPublic,
    tags,
    questionList,
  } = req.body;
  const quiz = new Quiz({
    _id: id,
    name,
    backgroundImage,
    description,
    pointsPerQuestion,
    numberOfQuestions: questionList.length,
    isPublic,
    tags,
    questionList,
    dateCreated: new Date().toISOString(),
  });

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(id, quiz, { new: true });
    res.json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPersonalQuizes = async (req, res) => {
  try {
    const quizes = await Quiz.find();
    res.status(200).send(quizes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = { createQuiz, getQuiz, updateQuiz, getPersonalQuizes };
