const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {
  joinUser,
  // getCurrentUser,
  addPointsToUser,
  getRoomUsers,
  userLeave,
  getNextUser,
  // getNextSocketUser,
} = require("./utils/users");

io.on("connection", (socket) => {
  socket.on("userInfo", (user) => {
    console.log(user);
    joinUser(socket.id, user);
    let users = getRoomUsers();
    console.log(users);
    io.emit("allUsers", users);
  });

  socket.on("plansza", (board) => {
    socket.broadcast.emit("planszaBroadcast", board);
  });
  socket.on("QUE", () => {
    let drawer = getNextUser();
    console.log(drawer);
    io.emit("queUser", drawer);
  });
  socket.on("gameOver", (gameOver) => {
    io.emit("gameOverRec", gameOver);
  });

  socket.on("msg", (msg) => {
    console.log(msg);
    io.emit("recmsg", msg);
  });
  socket.on("sendSettings", (boardWidth, difficulty, startGame) => {
    console.log(difficulty);
    socket.broadcast.emit("settingsRec", boardWidth, difficulty, startGame);
  });
  socket.on("sendPoints", (points, username) => {
    addPointsToUser(points, username);
    let users = getRoomUsers();
    console.log(users);
    io.emit("allUsers", users);
  });

  socket.on("disconnect", () => {
    userLeave(socket.id);
  });
});
app.use(express.static(path.join(__dirname, "dist")));
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("server nasluchuje"));
