const { addPointsToUser, getRoomUsers, getNextUser } = require("./Users");

function handleJzdSockets(socket, io) {
  socket.on("Jzdmsg", (msg) => {
    console.log(msg);
    io.emit("Jzdrecmsg", msg);
  });
  socket.on("SapersendPoints", (points, username) => {
    addPointsToUser(points, username, "saper");
    let users = getRoomUsers("saper");
    console.log(users);
    io.emit("allUsers", users);
  });
}
module.exports = {
  handleJzdSockets,
};
