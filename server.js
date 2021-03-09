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
const allUsers = [];
const users = [];

function allAssignement(id, nickname) {
  const current = { id, nickname };

  allUsers.push(current);
  return current;
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

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

  client.on("home", (data) => {
    console.log("Username received for home ==>", data);
    console.log("All current username ==>", allUsers);
  });

  client.on("login", (current_user) => {
    console.log("Username received for login ==>", current_user);
    const current = allAssignement(client.id, current_user);
    client.join(current.current_user);
    console.log(allUsers);
  });

  // Listen for chatMessage
  client.on("newMessage", (msg) => {
    // const user = getCurrentUser(client.id);
    // console.log("Result of current user ==>", user);
    // console.log("Nickname sent to newMessage ==>", client.id);
    console.log("New message emited ==>", msg);
    io.emit("newMessage", {
      pseudo: "Thyrse",
      message: msg,
    });
  });
});

io.emit("Yolo");

http.listen(port, () => {
  console.log("LISTENING ON PORT ==>", port);
});

// server.listen(4000, function () {
//   console.log("Server listening on port: 4000");
// });
