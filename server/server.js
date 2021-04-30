// import { NEW_MESSAGE, LOGIN } from "./socketActions";
const express = require("express");
const app = express();

const cors = require("cors");
const http = require("http").Server(app);
const { v1: uuidv1 } = require("uuid");

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
  const current = { id, username, inGame: false, room: "Lobby" };

  allUsers.push(current);
  return current;
}

function RandomTetrominos() {
  let newTetromino = [0, 1, 2, 3, 4, 5, 6];
  var tetrominosValues = newTetromino.length,
    temp,
    index;

  while (tetrominosValues > 0) {
    index = Math.floor(Math.random() * tetrominosValues);
    tetrominosValues--;
    temp = newTetromino[tetrominosValues];
    newTetromino[tetrominosValues] = newTetromino[index];
    newTetromino[index] = temp;
  }
  return newTetromino;
}

function allAssignementRooms(name, owner, type) {
  const current = {
    id: uuidv1(),
    name,
    owner,
    members: [],
    pieces: RandomTetrominos(),
    size: 5,
    type: type,
    hasStarted: false,
  };

  allRooms.push(current);
  return current;
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

function userLeave(id) {
  const index = allUsers.findIndex((user) => user.id === id);

  if (index !== -1) {
    return allUsers.splice(index, 1)[0];
  }
  // console.log("AllUsers ==>", allUsers);
}

function startGame(roomID) {
  const index = allRooms.findIndex((room) => room.id === roomID);

  if (index !== -1) {
    allRooms[index].hasStarted = true;
  }
  return allRooms;
}

function userLeaveRoom(id) {
  console.log("All rooms BEFORE update ==>", allRooms);
  allRooms.map((room) => {
    room.members.map((member) => {
      if (member.id === id) {
        const index = room.members.findIndex((user) => user.id === id);
        if (index !== -1) {
          room.members.splice(index, 1);
          if (room.owner === id && room.members.length >= 1) {
            room.owner = room.members[0].id;
          }
          if (room.hasStarted === true && room.members.length === 1) {
            io.to(room.id).emit("GAME_WINNER", room.id);
          }
        }
      }
    });
  });

  console.log("All rooms AFTER update ==>", allRooms);
  return allRooms;
}

function userJoinRoom(roomID, user) {
  const index = allRooms.findIndex((room) => room.id === roomID);

  const userToJoin = { id: user.socketID, username: user.username };
  // console.log("USER SENT JOIN ROOM ==>", user);
  if (allRooms[index].members.length === 0) {
    allRooms[index].owner = user.socketID;
  }
  if (index !== -1) {
    allRooms[index].members.push(userToJoin);
    return allRooms;
  }
}

function updateUsersList(roomID, user) {
  const index = allUsers.findIndex((usr) => usr.id === user.socketID);

  allUsers[index].room = roomID;

  return allUsers;
}

function addPiecesToRoom(roomID, pieces) {
  const index = allRooms.findIndex((room) => room.id === roomID);

  console.log("ALL ROOMS PIECES BEFORE ==>", allRooms);

  allRooms[index].pieces = allRooms[index].pieces.concat(pieces);

  console.log("ALL ROOMS PIECES AFTER ==>", allRooms);

  return allRooms;
}

// const index = require("./src/index");
// app.use(index);
// const io = socketIo(server);
// io.listen(port)

const gameClass = new Game();

io.on("connection", function (client) {
  // console.log("CONNECTED TO SOCKETIO ==>", client.id);
  // const player = new Player(client);
  // client.send({rooms: roomList });
  // here you can start emitting events to the client
  // client.on("home", (data) => {
  //   console.log("Username received for home ==>", data);
  //   console.log("All current username ==>", allUsers);
  // });

  // Listen to populate the store
  client.on("POPULATE", () => {
    io.emit("REFRESH_ROOMS", gameClass.rooms);
  });

  // Listen for user login
  client.on("LOGIN", (current_user) => {
    // console.log("Username received for login ==>", current_user);
    const current = allAssignement(client.id, current_user);
    // client.join(current.current_user);
    client.join("Lobby");
    // console.log("ALL USERS ==>", allUsers);
    gameClass.updatePlayers(allUsers);
    io.emit("REFRESH_USERSLIST", gameClass.players);
  });

  // Listen for new message in chat
  client.on("NEW_MESSAGE", (data) => {
    console.log("New message emited ==>", data);
    io.to(data.room).emit("REFRESH_MESSAGES", {
      username: data.username,
      message: data.message,
      room: data.room,
      user: data.userID,
    });
  });

  // Listen for creating room
  client.on("CREATE_ROOM", (data) => {
    allAssignementRooms(data.name, data.owner, data.type);
    gameClass.updateRooms(allRooms);
    io.emit("REFRESH_ROOMS", gameClass.rooms);
  });

  // Listen for creating room
  client.on("START_GAME", (data) => {
    startGame(data.room);
    gameClass.updateRooms(allRooms);
    io.emit("REFRESH_ROOMS", gameClass.rooms);
    io.to(data.room).emit("BEGIN_GAME");
  });

  // Listen for joining room
  client.on("JOIN_ROOM", (data) => {
    // console.log("ROOM JOINED ==>", data.datas.id);
    client.leave("Lobby");
    client.join(data.datas.id);
    // console.log(client.rooms);
    userJoinRoom(data.datas.id, data.currentUser);
    updateUsersList(data.datas.id, data.currentUser);
    gameClass.updateRooms(allRooms);
    gameClass.updatePlayers(allUsers);
    io.emit("REFRESH_ROOMS", gameClass.rooms);
    io.emit("REFRESH_USERSLIST", gameClass.players);
    // io.emit("REFRESH_USER", data.datas.id);
  });

  // Listen for joining lobby
  client.on("JOIN_LOBBY", (data) => {
    const roomName = "Lobby";
    if (data && data.room && data.room !== "Lobby") {
      console.log("ROOM INTENDED TO LEAVE ==>", data.room);
      userLeaveRoom(client.id);
      updateUsersList(roomName, data);
      gameClass.updateRooms(allRooms);
      gameClass.updatePlayers(allUsers);
      io.emit("REFRESH_ROOMS", gameClass.rooms);
      io.emit("REFRESH_USERSLIST", gameClass.players);
      client.leave(data.room);
    }
    client.join("Lobby");
    client.emit("REFRESH_USER", roomName);
  });

  // Listen for sending a penalty
  client.on("SEND_PENALTY", (data) => {
    console.log("NEED TO SEND A PENALTY", data);
    io.to(data.user.room).emit("RECEIVE_PENALTY", {
      user: data.user.socketID,
      penalty: data.penalty,
    });
  });

  // Listen for receiving new piece
  client.on("NEW_PIECES", (data) => {
    console.log("NEED TO SEND A PENALTY", data);
    addPiecesToRoom(data.room, data.pieces);
    gameClass.updateRooms(allRooms);
    io.to(data.room).emit("UPDATE_PIECES", allRooms);
  });

  // Listen for manual disconnect
  client.on("DISCONNECT", (data) => {
    // console.log("DISCONNECT DATAS EMITTED ==>", data);
    // console.log("DISCONNECT ALLUSERS before ==>", allUsers);
    userLeave(data);
    gameClass.updatePlayers(allUsers);
    io.emit("REFRESH_USERSLIST", gameClass.players);
  });
  // Listen for disconnect on refresh (or any other case that is triggered automatically by socket.io)
  client.on("disconnect", () => {
    // console.log("AN USER HAS BEEN DISCONNECTED ==>", client.id);
    userLeave(client.id);
    userLeaveRoom(client.id);
    gameClass.updatePlayers(allUsers);
    gameClass.updateRooms(allRooms);
    io.emit("REFRESH_USERSLIST", gameClass.players);
    io.emit("REFRESH_ROOMS", gameClass.rooms);
  });
});

http.listen(port, () => {
  console.log("\x1b[33m" + "LISTENING ON PORT ==> " + port + "\x1b[0m");
});
