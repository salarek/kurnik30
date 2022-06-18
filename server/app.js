const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const {
  joinUser,
  getRoomUsersWithPoints,
  userLeave,
} = require("./utils/Users");
const { handleSaperSockets } = require("./utils/saperSockets");
const { handleJzdSockets } = require("./utils/jzdSockets");

io.on("connection", (socket) => {
  socket.on("userInfo", (user, game) => {
    console.log(user);
    joinUser(socket.id, user, game);
    let users = getRoomUsersWithPoints(game);
    console.log(users);
    io.emit("allUsers", users);
  });

  handleSaperSockets(socket, io);
  handleJzdSockets(socket, io);
  socket.on("disconnect", () => {
    let users = getRoomUsersWithPoints(userLeave(socket.id));
    io.emit("allUsers", users);
  });
});
app.use(express.static(path.join(__dirname, "dist")));
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("server nasluchuje"));
