const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const port = 3000;

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("joinRoom", (personName) => {
    socket.join(personName);
    socket.on("chat message", (msg) => {
      io.to(personName).emit("chat message", msg);
    });
  });
});

server.listen(port, () => {
  console.log("Server is running on " + port);
});
