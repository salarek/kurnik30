const { addPointsToUser, getRoomUsers, getNextUser } = require("./Users");

function handleJzdSockets(socket, io) {
  socket.on("Jzdmsg", (msg) => {
    console.log(msg);
    io.emit("Jzdrecmsg", msg);
  });
  socket.on("Jzdplansza", (board) => {
    socket.broadcast.emit("JzdplanszaBroadcast", board);
  });
  socket.on("JzdsendPoints", (points, username) => {
    addPointsToUser(points, username, "jzd");
    let users = getRoomUsers("jzd");
    console.log(users);
    io.emit("allUsers", users);
  });
}
module.exports = {
  handleJzdSockets,
};
