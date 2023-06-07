const mongoose = require("mongoose");
const Quest = require("../models/Quest");
const User = require("../models/User");

const createQuest = async (req, res) => {
  const {
    title,
    backgroundImage,
    description,
    keywords,
    creatorName,
    pointsPerQuestion,
    isPublic,
    questionList,
    creatorId,
    likes,
    comments,
  } = req.body;
  const quest = new Quest({
    title,
    backgroundImage,
    description,
    keywords,
    creatorId,
    creatorName,
    pointsPerQuestion,
    numberOfQuestions: questionList.length,
    isPublic,
    questionList,
    dateCreated: new Date().toISOString(),
    likes,
    comments,
  });

  try {
    const newQuest = await quest.save();
    res.status(201).json(newQuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getQuest = async (req, res) => {
  try {
    console.log(req.params);
    const quest = await Quest.findById(req.params.id);
    if (!quest) {
      return res.status(404).json({ message: "Quest not found" });
    }
    res.status(200).json(quest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQuest = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No quest with id: ${id}`);
  }
  const {
    name,
    backgroundImage,
    description,
    pointsPerQuestion,
    isPublic,
    keywords,
    questionList,
    likes,
    comments,
  } = req.body;
  const quest = new Quest({
    _id: id,
    name,
    backgroundImage,
    description,
    pointsPerQuestion,
    numberOfQuestions: questionList.length,
    isPublic,
    keywords,
    questionList,
    dateCreated: new Date().toISOString(),
    likes,
    comments,
  });

  try {
    const updatedQuest = await Quest.findByIdAndUpdate(id, quest, {
      new: true,
    });
    res.json(updatedQuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeQuest = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`No quest with id: ${id}`);
  }
  try {
    await Quest.findByIdAndRemove(id);
    res.json({ message: "Quest deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getPersonalQuests = async (req, res) => {
  let teacherId = req.params.teacherId;
  try {
    const quests = await Quest.find({ creatorId: teacherId });
    res.status(200).send(quests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPublicQuests = async (req, res) => {
  try {
    const LIMIT = 6;
    const quests = await Quest.find({ isPublic: true })
      .sort({ _id: -1 })
      .limit(LIMIT);
    res.status(200).send(quests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  const { questId } = req.params;
  try {
    const quest = await Quest.findById(questId);
    if (quest == null) {
      return res.status(404).json({ message: "Quest not found" });
    }
    res.status(200).send(quest.questionList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTask = async (req, res) => {
  const { questId } = req.params;
  const {
    questionType,
    question,
    pointType,
    answerTime,
    answerList,
    correctAnswersList,
  } = req.body;
  let quest;
  try {
    quest = await Quest.findById(questId);
    if (quest == null) {
      return res.status(404).json({ message: "Quest not found" });
    }
    quest.questionList.push({
      questionType,
      question,
      pointType,
      answerTime,
      answerList,
      correctAnswersList,
    });
    quest.numberOfQuestions += 1;
    const updatedQuest = await quest.save();
    res.send(updatedQuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeTask = async (req, res) => {
  const { questId, questionId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(questId)) {
    return res.status(404).send(`No quest with id: ${questId}`);
  }
  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    return res.status(404).send(`No question with id: ${questionId}`);
  }
  const quest = await Quest.findById(questId);

  try {
    let questionIndex = quest.questionList.findIndex(
      (obj) => obj._id == questionId
    );
    quest.questionList.splice(questionIndex, 1);
    quest.numberOfQuestions -= 1;
    await Quest.findByIdAndUpdate(questId, quest, {
      new: true,
    });
    res.json({ message: "Question deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  const { questId, questionId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(questId)) {
    return res.status(404).send(`No quest with id: ${questId}`);
  }
  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    return res.status(404).send(`No question with id: ${questionId}`);
  }

  const {
    questionType,
    question,
    pointType,
    answerTime,
    answerList,
    correctAnswersList,
  } = req.body;
  let quest;

  try {
    quest = await Quest.findById(questId);
    if (quest == null) {
      return res.status(404).json({ message: "Quest not found" });
    }
    let questionIndex = quest.questionList.findIndex(
      (obj) => obj._id == questionId
    );
    quest.questionList[questionIndex] = {
      _id: questionId,
      questionType,
      question,
      pointType,
      answerTime,
      answerList,
      correctAnswer,
      correctAnswersList,
    };
    const updatedQuest = await Quest.findByIdAndUpdate(questId, quest, {
      new: true,
    });
    res.send(updatedQuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const likeQuest = async (req, res) => {
  const { questId, userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(questId)) {
    return res.status(404).send(`No quest with id: ${questId}`);
  }

  try {
    const quest = await Quest.findById(questId);
    const index = quest.likes.findIndex((id) => id === String(userId));
    if (index === -1) {
      quest.likes.push(userId);
    } else {
      quest.likes = quest.likes.filter((id) => id !== String(userId));
    }
    const updatedQuest = await Quest.findByIdAndUpdate(questId, quest, {
      new: true,
    });

    res.status(200).send(updatedQuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchQuests = async (req, res) => {
  const { search, keywords } = req.params;
  const searchParams = search === "1" ? "" : search;
  const keywordsParams = keywords === "1" ? "" : keywords;
  try {
    const title = new RegExp(searchParams, "i");
    const keywords = keywordsParams.split(",").map((i) => new RegExp(i, "i"));
    const params = [];
    if (searchParams) {
      params.push({ title });
    }
    if (keywordsParams) {
      params.push({ keywords: { $in: keywords } });
    }
    const quests = await Quest.find({
      isPublic: true,
      $or: params,
    });
    res.status(200).send(quests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const commentQuest = async (req, res) => {
  const { questId } = req.params;
  const { comment, userId } = req.body;
  console.log("questId", questId);
  console.log("userId", userId);

  try {
    const user = await User.findById(userId);
    const quest = await Quest.findById(questId);
    quest.comments.push(`${user.firstName} ${user.lastName}: ${comment}`);
    const updatedQuest = await Quest.findByIdAndUpdate(questId, quest, {
      new: true,
    });
    console.log(updatedQuest.comments);
    res.status(200).send(updatedQuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createQuest,
  getQuest,
  updateQuest,
  getPersonalQuests,
  getPublicQuests,
  removeQuest,
  searchQuests,
  commentQuest,
  likeQuest,
  getTasks,
  addTask,
  removeTask,
  updateTask,
};
