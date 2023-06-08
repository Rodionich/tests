const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  questId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quest",
  },
  pin: {
    type: String,
  },
  isLive: {
    type: Boolean,
    default: false,
  },
  playerList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  playerResultList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerResult",
    },
  ],
});

module.exports = mongoose.model("Game", gameSchema);
