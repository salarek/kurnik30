const Express = require("express");
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);
const {
  joinUser,
  // getCurrentUser,
  // getRoomUsers,
   userLeave,
   getNextUser,
  // getNextSocketUser,
} = require("./utils/users");




Socketio.on("connection", (socket) => {
  socket.on("userInfo", (user) => {
    console.log(user);
    joinUser(socket.id, user)
  });
  socket.emit("msg", "dupa");
  socket.on("plansza", (board) => {
   
    socket.broadcast.emit("planszaBroadcast", board);
  });
  socket.on("QUE",()=>{
    let drawer = getNextUser();
    console.log(drawer);
    Socketio.emit("queUser", drawer);
  });
  socket.on("msg2", (data2) => {
    Socketio.emit("msg3", data2);
    console.log(data2);
  });
  socket.on("disconnect", () => {
    userLeave(socket.id);
  });
});


Http.listen(3000, () => {
  console.log("Listening at port :3000 ...");
});
