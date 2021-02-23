const { addPointsToUser, getRoomUsers, getNextUser } = require("./Users");

function handleSaperSockets(socket, io) {
  socket.on("Saperplansza", (board) => {
    socket.broadcast.emit("planszaBroadcast", board);
  });
  socket.on("SaperQUE", () => {
    let drawer = getNextUser("saper");
    console.log(drawer);
    io.emit("queUser", drawer);
  });
  socket.on("SapergameOver", (gameOver) => {
    io.emit("gameOverRec", gameOver);
  });

  socket.on("Sapermsg", (msg) => {
    console.log(msg);
    io.emit("recmsg", msg);
  });
  socket.on("SapersendSettings", (boardWidth, difficulty, startGame) => {
    console.log(difficulty);
    socket.broadcast.emit("settingsRec", boardWidth, difficulty, startGame);
  });
  socket.on("SapersendPoints", (points, username) => {
    addPointsToUser(points, username, "saper");
    let users = getRoomUsers("saper");
    console.log(users);
    io.emit("allUsers", users);
  });
}
module.exports = {
  handleSaperSockets,
};
