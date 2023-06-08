const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  keywords: { type: String },
  backgroundImage: { type: String },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  creatorName: { type: String },
  pointsPerQuestion: {
    type: Number,
    min: 1,
  },
  numberOfQuestions: {
    type: Number,
    default: 0,
  },
  isPublic: { type: Boolean, required: true, default: true },
  questionList: [
    {
      questionType: {
        type: String,
        enum: ["True/False", "Quiz", "OpenQuestion"],
        required: true,
      },
      pointType: {
        type: String,
        enum: ["Standard", "Double", "BasedOnTime"],
        required: true,
      },
      answerTime: {
        type: Number,
        min: 5,
        max: 90,
      },
      backgroundImage: { type: String },
      question: {
        type: String,
        required: true,
      },
      answerList: [
        {
          answerNumber: { type: String },
          answer: { type: String },
          isCorrect: { type: Boolean },
        },
      ],
      questionNumber: { type: Number, required: true },
    },
  ],
  dateCreated: { type: Date, default: new Date() },
  likes: { type: [String], default: [] },
  comments: { type: [String], default: [] },
});

module.exports = mongoose.model("Quest", questSchema);
