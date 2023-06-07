const express = require("express");
const app = express();
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

require("dotenv").config({ path: "../.env" });
const PORT = process.env.PORT || 8000;

// const {
//   authenticateToken,
//   regenerateAccessToken,
// } = require("./middleware/auth");

// app.use(authenticateToken);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database Mongo");
  })
  .catch((e) => console.log(e));

const authRouter = require("./routes/auth");
const questRouter = require("./routes/quest");
const gameRouter = require("./routes/game");
const studentScoreRouter = require("./routes/game");
app.use("/api/auth", authRouter);
app.use("/api/quests", questRouter);
app.use("/api/game", gameRouter);
app.use("/api/studentScore", studentScoreRouter);

let quest;
let students = [];

const addStudent = (studentName, socketId) => {
  !students.some((student) => student.socketId === socketId) &&
    students.push({ studentName, socketId });
};

const getStudent = (socketId) => {
  return students.find((student) => student.socketId === socketId);
};

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (webSocket) => {
  console.log(`websocket ${webSocket.id} has connected`);
  webSocket.on("disconnect", (reason) => {
    console.log(`websocket ${webSocket.id} has disconnected`);
    console.log(reason);
  });
  webSocket.on("init-game", (activateGame) => {
    quest = JSON.parse(JSON.stringify(activateGame));
    webSocket.join(quest);
    const teacherId = webSocket.id;
    console.log(
      "Host with id " +
        webSocket.id +
        " started game and joined room: " +
        quest.pin
    );
  });
  webSocket.on("student-join", (user, socketId, pin, check) => {
    if (quest.pin === pin) {
      addStudent(user.userName, socketId);
      check("correct", user._id, quest._id);
      webSocket.join(quest.pin);
      console.log(
        "Student " +
          user.userName +
          " with id " +
          webSocket.id +
          " joined room " +
          quest.pin
      );
      let student = getStudent(socketId);
      io.emit("student-added", student);
    } else {
      check("wrong", user._id, quest._id);
    }
  });
  webSocket.on("start-game", (newQuiz) => {
    quiz = JSON.parse(JSON.stringify(newQuiz));
    webSocket.to(quest.pin).emit("move-to-quest-page", quest._id);
  });

  webSocket.on("question-preview", (check) => {
    check();
    webSocket.to(quest.pin).emit("host-start-preview");
  });

  webSocket.on("start-question-timer", (time, question, cb) => {
    console.log(question);
    webSocket.to(quest.pin).emit("host-start-question-timer", time, question);
    cb();
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = { app };
