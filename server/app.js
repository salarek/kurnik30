const Express = require("express");
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);
var users = [];
var nextUsers = "";
var i = 0;

// Socketio.on("connection", socket =>{

// });

function nextUser() {
  var currentuser;
  i++;
  if (i == 1) {
    currentuser = users[0];
  } else {
    currentuser = users[1];
  }
  if (i > 1) {
    i = 0;
  }
  return currentuser;
}
Socketio.on("connection", (socket) => {
  socket.on("userInfo", (user) => {
    console.log(user);
    users.push(user);
  });
  socket.emit("msg", "dupa");
  socket.on("plansza", (board) => {
    nextUsers = nextUser();
    console.log(nextUsers);
    socket.broadcast.emit("queUser", nextUsers);
    socket.broadcast.emit("planszaBroadcast", board);
  });
  socket.on("msg2", (data2) => {
    Socketio.emit("msg3", data2);
    console.log(data2);
  });
});

Http.listen(3000, () => {
  console.log("Listening at port :3000 ...");
});
