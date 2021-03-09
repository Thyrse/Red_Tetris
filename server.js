const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const cors = require("cors");

app.use(cors());

// const port = 8000;
const port = 4000;

// const index = require("./src/index");

// app.use(index);

// const io = socketIo(server);

// io.listen(port)

io.on("connection", (client) => {
  console.log("CONNECTED TO SOCKETIO");
  // const player = new Player(client);
  // client.send({rooms: roomList });
  // here you can start emitting events to the client
  client.on("yolo", (data) => {
    console.log("Received emit!!!");
  });

  client.on("login", (data) => {
    console.log("Username received ==>", data);
  });
});

io.emit("Yolo");

http.listen(port, () => {
  console.log("LISTENING ON PORT ==>", port);
});

// server.listen(4000, function () {
//   console.log("Server listening on port: 4000");
// });
