const Express = require("express");
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

// Socketio.on("connection", socket =>{

// });
Socketio.on("connection", (socket) => {
  socket.emit("msg", "dupa");
  socket.on("msg2", (data2) => {
    socket.emit("msg3", data2);
    console.log(data2);
  });
});

Http.listen(3000, () => {
  console.log("Listening at port :3000 ...");
});
