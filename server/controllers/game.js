const mongoose = require("mongoose");
const Game = require("../models/Game");

const activateGame = async (req, res) => {
  const { teacherId, quizId, isLive, playerList, playerResultList, pin } =
    req.body;

  const game = new Game({
    teacherId,
    quizId,
    date: new Date().toISOString(),
    pin,
    isLive,
    playerList,
    playerResultList,
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addStudent = async (req, res) => {
  const { questId } = req.params;
  const { studentId } = req.body;

  let quest;
  try {
    quest = await Game.findById(questId);
    quest.playerList.push(studentId);
    const updatedQuest = await quest.save();
    res.send(updatedQuest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { activateGame, addStudent };
