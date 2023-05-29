const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
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
        enum: ["True/False", "Quiz"],
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
          name: { type: String },
          body: { type: String },
          isCorrect: { type: Boolean },
        },
      ],
      questionIndex: { type: Number, required: true },
    },
  ],
  dateCreated: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Quiz", quizSchema);
