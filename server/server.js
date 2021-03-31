// import { NEW_MESSAGE, LOGIN } from "./socketActions";
const express = require("express");
const app = express();

require("dotenv").config();
const cors = require("cors");
const http = require("http").Server(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const Game = require("./class/Game");

app.use(cors());

const port = 4000;
const allUsers = [];
const allRooms = [];
const users = [];

function allAssignement(id, username) {
  const current = { id, username, inGame: false };

  allUsers.push(current);
  return current;
}

function allAssignementRooms(name, owner) {
  const current = { name, owner, members: [], size: 5 };

  allRooms.push(current);
  return current;
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// const index = require("./src/index");
// app.use(index);
// const io = socketIo(server);
// io.listen(port)

const gameClass = new Game();

io.on("connection", function (client) {
  console.log("CONNECTED TO SOCKETIO ==>", client.id);
  // const player = new Player(client);
  // client.send({rooms: roomList });
  // here you can start emitting events to the client
  client.on("home", (data) => {
    console.log("Username received for home ==>", data);
    console.log("All current username ==>", allUsers);
  });

  client.on("LOGIN", (current_user) => {
    console.log("Username received for login ==>", current_user);
    const current = allAssignement(client.id, current_user);
    client.join(current.current_user);
    console.log("ALL USERS ==>", allUsers);
    gameClass.addPlayer(allUsers);
    io.emit("NEW_USER", gameClass.players);
  });

  // Listen for chatMessage
  client.on("NEW_MESSAGE", (data) => {
    // const user = getCurrentUser(client.id);
    // console.log("Result of current user ==>", user);
    // console.log("Username sent to newMessage ==>", client.id);
    console.log("New message emited ==>", data);
    io.emit("NEW_MESSAGE", {
      username: data.username,
      message: data.message,
    });
  });

  // Listen for chatMessage
  client.on("CREATE_ROOM", (data) => {
    // const user = getCurrentUser(client.id);
    // console.log("Result of current user ==>", user);
    // console.log("Username sent to newMessage ==>", client.id);
    console.log("ROOM DATAS EMITTED ==>", data);
    allAssignementRooms(data.name, data.owner);
    gameClass.addRoom(allRooms);
    console.log("ROOMS LIST FROM CLASS ==>", gameClass.rooms);
    io.emit("ADD_ROOM", gameClass.rooms);
  });
});

console.log(process.env.PORT + "     " + port);

http.listen(port, () => {
  console.log("\x1b[33m" + "LISTENING ON PORT ==> " + port + "\x1b[0m");
});
