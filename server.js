const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
// const port = 8000;
const port = 4000;
// const index = require("./src/index");
const app = express();
// app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

// io.listen(port)

io.on("connection", (client) => {
  console.log("SALUT SALUT");
  // here you can start emitting events to the client
});

io.listen(port, () => {
  console.log("LISTENING ON PORT ==>", port);
});

console.log("Hello world");
