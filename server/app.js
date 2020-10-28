const Express = require("express");
const { Socket } = require("socket.io-client");
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);
const PORT = process.env.PORT || 3000;
const {
  joinUser,
  // getCurrentUser,
  addPointsToUser,
  getRoomUsers,
  userLeave,
  getNextUser,
  // getNextSocketUser,
} = require("./utils/users");

Socketio.on("connection", (socket) => {
  socket.on("userInfo", (user) => {
    console.log(user);
    joinUser(socket.id, user);
    let users = getRoomUsers();
    console.log(users);
    Socketio.emit("allUsers", users);
  });

  socket.on("plansza", (board) => {
    socket.broadcast.emit("planszaBroadcast", board);
  });
  socket.on("QUE", () => {
    let drawer = getNextUser();
    console.log(drawer);
    Socketio.emit("queUser", drawer);
  });
  socket.on("gameOver", (gameOver) => {
    Socketio.emit("gameOverRec", gameOver);
  });

  socket.on("msg", (msg) => {
    console.log(msg);
    Socketio.emit("recmsg", msg);
  });
  socket.on("sendSettings", (boardWidth, difficulty, startGame) => {
    console.log(difficulty);
    socket.broadcast.emit("settingsRec", boardWidth, difficulty, startGame);
  });
  socket.on("sendPoints", (points, username) => {
    addPointsToUser(points, username);
    let users = getRoomUsers();
    console.log(users);
    Socketio.emit("allUsers", users);
  });

  socket.on("disconnect", () => {
    userLeave(socket.id);
  });
});

Http.listen(PORT, () => {
  console.log(`Listening at port ${PORT} ...`);
});
