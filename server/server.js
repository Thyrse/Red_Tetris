// import { NEW_MESSAGE, LOGIN } from "./socketActions";
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

class Game {
  constructor() {
    this._room = [];
    this._players = [];
  }

  get rooms() {
    return this._rooms;
  }
  get players() {
    return this._players;
  }

  addRomm(room) {
    this._room.push(room);
  }

  addPlayer(player) {
    this._players.push(player);
    return player;
  }

  findRoom(roomName) {
    return this._room.find((room) => roomName.name === roomName);
  }

  findPlayer(playerId) {
    return this._players.find((player) => player.id === playerId);
  }
}

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

const yolo = new Game();

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

  client.on("LOGIN", (current_user) => {
    console.log("Username received for login ==>", current_user);
    const current = allAssignement(client.id, current_user);
    client.join(current.current_user);
    console.log(allUsers);
    yolo.addPlayer(current_user);
    io.emit("NEW_USER", yolo.players);
  });

  // Listen for chatMessage
  client.on("NEW_MESSAGE", (msg) => {
    // const user = getCurrentUser(client.id);
    // console.log("Result of current user ==>", user);
    // console.log("Nickname sent to newMessage ==>", client.id);
    console.log("New message emited ==>", msg);
    io.emit("NEW_MESSAGE", {
      pseudo: "Thyrse",
      message: msg,
    });
  });

  client.on("NEW_USER", (msg) => {
    // const user = getCurrentUser(client.id);
    // console.log("Result of current user ==>", user);
    // console.log("Nickname sent to newMessage ==>", client.id);
    // addPlayer(msg)
    console.log("New message emited ==>", msg);
    // io.emit("NEW_USER", {
    //   pseudo: "Yolo",
    //   message: "Message texte en dur",
    // });
  });
});

io.emit("Yolo");

http.listen(port, () => {
  console.log("LISTENING ON PORT ==>", port);
});

// server.listen(4000, function () {
//   console.log("Server listening on port: 4000");
// });
